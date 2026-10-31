import React from 'react';
import { FileText, HelpCircle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import NoticeUpload from '../components/NoticeUpload';

const NoticesPage = () => {
  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-badge">
            <FileText size={14} />
            <span>Document AI</span>
          </div>
          <h1 className="page-title">Notice & Circular Assistant</h1>
          <p className="page-description">
            Upload official university circulars or exam notifications to query key dates, eligibility, and rules instantly.
          </p>
        </div>
      </div>

      {/* Main Notice Upload & Ask component */}
      <NoticeUpload />

      {/* Instructional Feature Cards */}
      <div className="notices-features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={20} />
          </div>
          <h4>Instant PDF Parsing</h4>
          <p>
            Upload any college notice in PDF format. The backend extracts text and prepares it for intelligent question answering.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <HelpCircle size={20} />
          </div>
          <h4>Natural Language QA</h4>
          <p>
            Ask specific questions such as "What is the deadline for exam fees?" or "Who is required to submit documents?"
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <ShieldCheck size={20} />
          </div>
          <h4>Accurate Grounding</h4>
          <p>
            The AI answers questions strictly based on the content of the uploaded circular to avoid misinformation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
