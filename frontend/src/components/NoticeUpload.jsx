import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Send,
  Loader2,
  RefreshCw,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { uploadNotice, askNoticeQuestion } from '../services/api';

const NoticeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedNotice, setUploadedNotice] = useState(null); // { id, title, message }

  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [askError, setAskError] = useState(null);
  const [qaHistory, setQaHistory] = useState([]); // Array of { question, answer, timestamp }

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setUploadError('Only PDF documents are allowed. Please select a valid .pdf file.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Call POST /api/notices/upload via api service
      const res = await uploadNotice(selectedFile);
      if (res && res.success && res.data) {
        setUploadedNotice(res.data);
      } else if (res && res.data) {
        setUploadedNotice(res.data);
      } else {
        setUploadedNotice({
          id: res?.id || 1,
          title: selectedFile.name,
          message: 'Notice uploaded successfully',
        });
      }
    } catch (err) {
      console.error('Upload Error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to upload notice PDF. Please check backend connection.';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim() || !uploadedNotice?.id || isAsking) return;

    const currentQ = question.trim();
    setIsAsking(true);
    setAskError(null);

    try {
      // Call POST /api/notices/ask via api service
      const res = await askNoticeQuestion(uploadedNotice.id, currentQ);
      let answerText = 'No answer returned.';
      if (res && res.data && res.data.answer) {
        answerText = res.data.answer;
      } else if (res && res.answer) {
        answerText = res.answer;
      }

      setQaHistory((prev) => [
        {
          question: currentQ,
          answer: answerText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
      setQuestion('');
    } catch (err) {
      console.error('Ask Notice Error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to get answer for this notice.';
      setAskError(msg);
    } finally {
      setIsAsking(false);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setUploadedNotice(null);
    setQuestion('');
    setQaHistory([]);
    setUploadError(null);
    setAskError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const suggestedQuestions = [
    'What is the last date mentioned in this notice?',
    'Who is eligible to participate/apply?',
    'What are the key instructions or venue?',
    'Summarize this notice in 3 bullet points.',
  ];

  return (
    <div className="notice-upload-container">
      {!uploadedNotice ? (
        /* STEP 1: Upload Notice Form */
        <div className="upload-box-card">
          <div className="upload-header">
            <div className="upload-icon-circle">
              <UploadCloud size={28} />
            </div>
            <h3>Upload Campus Notice</h3>
            <p>Upload any college notice PDF to ask questions and get instant AI-powered answers.</p>
          </div>

          <form onSubmit={handleUpload} className="upload-form">
            <div
              className={`file-drop-area ${selectedFile ? 'file-selected' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden-file-input"
                onChange={handleFileChange}
              />

              {selectedFile ? (
                <div className="file-info-preview">
                  <FileCheck size={36} className="pdf-icon" />
                  <div className="file-meta">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">
                      {(selectedFile.size / 1024).toFixed(1)} KB • PDF Document
                    </span>
                  </div>
                  <button
                    type="button"
                    className="change-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="drop-prompt">
                  <UploadCloud size={32} className="drop-icon" />
                  <p className="drop-title">
                    <strong>Click to browse</strong> or drag & drop PDF
                  </p>
                  <span className="drop-subtitle">Only PDF files are accepted</span>
                </div>
              )}
            </div>

            {uploadError && (
              <div className="error-alert">
                <AlertCircle size={16} />
                <span>{uploadError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedFile || isUploading}
              className={`primary-upload-btn ${!selectedFile || isUploading ? 'disabled' : ''}`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Processing Notice PDF...</span>
                </>
              ) : (
                <>
                  <UploadCloud size={18} />
                  <span>Upload & Analyze Notice</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: Ask Questions About Uploaded Notice */
        <div className="notice-qa-card">
          <div className="notice-active-banner">
            <div className="notice-info">
              <div className="notice-badge">
                <CheckCircle size={16} />
                <span>Notice ID #{uploadedNotice.id}</span>
              </div>
              <h3 className="notice-title">
                <FileText size={20} />
                <span>{uploadedNotice.title || selectedFile?.name || 'Notice Document'}</span>
              </h3>
              <p className="notice-msg">{uploadedNotice.message || 'Notice uploaded successfully. Ask any question below:'}</p>
            </div>
            <button type="button" onClick={resetAll} className="upload-another-btn">
              <RefreshCw size={14} />
              <span>Upload Another Notice</span>
            </button>
          </div>

          {/* Question input form */}
          <form onSubmit={handleAskQuestion} className="notice-qa-form">
            <label htmlFor="notice-question" className="qa-input-label">
              <HelpCircle size={16} />
              <span>Ask AI anything about this notice:</span>
            </label>

            <div className="qa-input-row">
              <input
                id="notice-question"
                type="text"
                className="qa-input"
                placeholder="e.g. What is the last date to submit?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isAsking}
              />
              <button
                type="submit"
                disabled={!question.trim() || isAsking}
                className={`qa-submit-btn ${!question.trim() || isAsking ? 'disabled' : ''}`}
              >
                {isAsking ? (
                  <Loader2 size={18} className="spinner" />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Ask</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick suggested questions chips */}
            <div className="notice-chips">
              <span className="notice-chips-label">Quick Suggestions:</span>
              <div className="chips-row">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="notice-chip"
                    onClick={() => setQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {askError && (
              <div className="error-alert">
                <AlertCircle size={16} />
                <span>{askError}</span>
              </div>
            )}
          </form>

          {/* QA Responses History */}
          <div className="notice-qa-history">
            <h4>
              <Sparkles size={16} />
              <span>Notice Insights & Answers</span>
            </h4>

            {isAsking && (
              <div className="qa-loading-card">
                <Loader2 size={18} className="spinner" />
                <span>Analyzing notice text to generate answer...</span>
              </div>
            )}

            {qaHistory.length === 0 && !isAsking ? (
              <div className="qa-empty-state">
                <HelpCircle size={32} />
                <p>No questions asked yet. Try asking "What is the last date?" above!</p>
              </div>
            ) : (
              qaHistory.map((item, idx) => (
                <div key={idx} className="qa-item-card">
                  <div className="qa-question-row">
                    <span className="q-label">Question:</span>
                    <span className="q-text">{item.question}</span>
                    <span className="q-time">{item.timestamp}</span>
                  </div>
                  <div className="qa-answer-row">
                    <span className="a-label">AI Answer:</span>
                    <span className="a-text">{item.answer}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeUpload;
