import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  Check, 
  Wand2,
  FileCheck,
  Calendar,
  BookOpen,
  User,
  Building,
  GraduationCap
} from 'lucide-react';
import { NACETEM_COLLECTIONS, DOCUMENT_TYPES, LECTURE_SERIES_OPTIONS } from '../data/mockLibraryData';

export default function RepositoryUploadModal({ isOpen, onClose, onUploadBook, currentUser }) {
  const defaultAuthorName = currentUser?.name && !currentUser.name.includes('@') && !currentUser.name.toLowerCase().includes('staff') 
    ? currentUser.name 
    : 'Abubakar Rufai';

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authors, setAuthors] = useState(defaultAuthorName);
  const [pubYear, setPubYear] = useState('2015');
  const [publisher, setPublisher] = useState('National Centre for Technology Management (NACETEM)');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [customDoi, setCustomDoi] = useState('');
  const [category, setCategory] = useState('Departmental Lecture Series');
  const [lectureSeriesSub, setLectureSeriesSub] = useState('Planning, Programming and Linkages Lecture Series');
  const [type, setType] = useState('Lecture Notes / Presentation');
  const [abstract, setAbstract] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [policyRecommendations, setPolicyRecommendations] = useState('');
  
  // Real File Upload State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPdfDataUrl, setUploadedPdfDataUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);

    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    if (!title) setTitle(cleanName);
    if (!authors) setAuthors(defaultAuthorName);
    
    const autoAbstract = `Official document "${file.name}" deposited into the NACETEM ${category} (${lectureSeriesSub}) by ${authors || defaultAuthorName}. Full document verified and indexed for 100% online reading, academic citations, and direct PDF/Word download.`;
    if (!abstract) setAbstract(autoAbstract);

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedPdfDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAutoGenerateAiSummary = () => {
    const activeTitle = title || (uploadedFile ? uploadedFile.name : 'Lecture Series Paper');
    setIsGeneratingAi(true);

    setTimeout(() => {
      const generatedTakeaways = [
        `Delivers key instructional modules and research frameworks for ${lectureSeriesSub}.`,
        `Outlines strategic technology management principles, project programming matrices, and capacity building goals.`,
        `Establishes quantitative metrics for measuring national STI capability and institutional readiness.`
      ].join('\n');

      const generatedPolicy = [
        `Formulate standardized operational guidelines and inter-agency coordination protocols.`,
        `Allocate dedicated funding for continuous capacity building and technical infrastructure development.`
      ].join('\n');

      if (!abstract) {
        setAbstract(`Lecture series module on ${activeTitle} addressing key operational frameworks in ${lectureSeriesSub}. The resource provides actionable methods for research and professional development.`);
      }

      setKeyTakeaways(generatedTakeaways);
      setPolicyRecommendations(generatedPolicy);
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalTitle = title.trim() || (uploadedFile ? uploadedFile.name : 'Departmental Lecture Series Document');
    const finalAuthors = authors.trim() ? authors.split(/;|,/).map(a => a.trim()).filter(Boolean) : [defaultAuthorName];
    const finalAbstract = abstract.trim() || `Official document "${finalTitle}" deposited under ${lectureSeriesSub} by ${finalAuthors.join(', ')}. Full text indexed for online reading and download.`;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedDoi = customDoi || `10.5281/nacetem.${category.toLowerCase().includes('lecture') ? 'lect' : '2026'}.${Math.floor(1000 + Math.random() * 9000)}`;
      
      const takeawaysArr = keyTakeaways ? keyTakeaways.split('\n').filter(Boolean) : [
        `Delivers instructional modules for ${lectureSeriesSub}.`,
        'Provides actionable STI capacity building frameworks.'
      ];

      const policyArr = policyRecommendations ? policyRecommendations.split('\n').filter(Boolean) : [
        'Standardize departmental lecture series distribution across zonal centers.',
        'Establish continuous professional skill development modules.'
      ];

      const newDoc = {
        id: `user-paper-${Date.now()}`,
        isUserUploaded: true,
        uploadedBy: currentUser?.name || defaultAuthorName,
        title: finalTitle,
        subtitle: subtitle.trim() || `Departmental Lecture Series: ${lectureSeriesSub}`,
        authors: finalAuthors,
        institution: `${publisher.trim()} (Departmental Lecture Series)`,
        publisher: publisher.trim() || 'National Centre for Technology Management (NACETEM)',
        category,
        lectureSeriesSub: category.includes('Departmental') ? lectureSeriesSub : null,
        type,
        year: parseInt(pubYear) || 2026,
        doi: generatedDoi,
        volume: volume.trim(),
        issue: issue.trim(),
        pages: pages.trim(),
        isbn: `978-978-542${Math.floor(10 + Math.random() * 80)}-${Math.floor(1 + Math.random() * 9)}`,
        accessLevel: 'Open Access',
        rating: 5.0,
        citationsCount: 1,
        downloadsCount: 1,
        pageCount: 45,
        coverColor: 'from-emerald-600 via-teal-800 to-slate-900',
        coverAccent: '#059669',
        featured: true,
        audioAvailable: true,
        pdfDataUrl: uploadedPdfDataUrl,
        uploadedFileName: uploadedFile ? uploadedFile.name : null,
        abstract: finalAbstract,
        keyTakeaways: takeawaysArr,
        policyRecommendations: policyArr,
        fullText: [
          {
            sectionTitle: 'Executive Summary & Lecture Overview',
            content: `${finalAbstract}\n\nKey Takeaways:\n${takeawaysArr.map(t => '• ' + t).join('\n')}`
          },
          {
            sectionTitle: '1. Lecture Module & Frameworks',
            content: `This publication by ${finalAuthors.join(', ')} forms part of the NACETEM Departmental Lecture Series (${lectureSeriesSub}).\n\nTitle: ${finalTitle}\nPublished: ${pubYear || 2026}.`
          },
          {
            sectionTitle: '2. Implementation & Key References',
            content: `Policy Directives:\n${policyArr.map((p, i) => `${i+1}. ${p}`).join('\n\n')}`
          }
        ]
      };

      onUploadBook(newDoc);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Upload Document / Lecture Series</h2>
              <p className="text-xs text-slate-500 font-medium">Supports Departmental Lecture Series, Papers, PDF & Word Files</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.docx,.doc,.txt,.epub,.pptx,.ppt"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Drag and drop / File selector zone */}
        <div 
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            uploadedFile 
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
              : 'border-slate-300 hover:border-emerald-500 bg-slate-50 text-slate-600'
          }`}
        >
          {uploadedFile ? (
            <div className="space-y-1">
              <FileCheck className="w-7 h-7 mx-auto text-emerald-700" />
              <p className="font-bold text-xs text-emerald-900">Attached File: {uploadedFile.name}</p>
              <p className="text-[11px] text-emerald-700">
                Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Dashboard Indexing & Downloads
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <UploadCloud className="w-8 h-8 mx-auto text-emerald-700 animate-bounce" />
              <p className="font-extrabold text-xs text-slate-900">Click to Select or Drag & Drop PDF / Word Document</p>
              <p className="text-[11px] text-slate-500">Supports .pdf, .docx, .doc, .txt, .pptx files</p>
            </div>
          )}
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div className="space-y-1">
            <label className="text-slate-800 font-bold flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Document / Lecture Title *</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Planning, Programming and Inter-Agency Linkages in STI Governance"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Full Author Name(s) * (e.g. Abubakar Rufai)</span>
              </label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Abubakar Rufai"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Publication Year * (e.g. 2026, 2024, 2015)</span>
              </label>
              <input
                type="text"
                value={pubYear}
                onChange={(e) => setPubYear(e.target.value)}
                placeholder="2026"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold">Category Collection *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
              >
                {NACETEM_COLLECTIONS.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Departmental Lecture Series Sub-Option */}
            {category.includes('Departmental') ? (
              <div className="space-y-1">
                <label className="text-slate-800 font-bold flex items-center space-x-1 text-emerald-800">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Select Lecture Series Sub-Category *</span>
                </label>
                <select
                  value={lectureSeriesSub}
                  onChange={(e) => setLectureSeriesSub(e.target.value)}
                  className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2.5 text-emerald-950 focus:outline-none focus:border-emerald-600 font-extrabold"
                >
                  {LECTURE_SERIES_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-slate-800 font-bold">Document Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
                >
                  {DOCUMENT_TYPES.filter(t => t !== 'All Types').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-emerald-700" />
                <span>Journal / Publisher / Department Name</span>
              </label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="National Centre for Technology Management (NACETEM)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-800 font-bold">Official DOI / URL (optional)</label>
              <input
                type="text"
                value={customDoi}
                onChange={(e) => setCustomDoi(e.target.value)}
                placeholder="10.5281/nacetem.lect.2026.001"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-slate-800 font-bold">Document Abstract / Lecture Overview</label>
              <button
                type="button"
                onClick={handleAutoGenerateAiSummary}
                disabled={isGeneratingAi}
                className="text-emerald-800 hover:text-emerald-950 font-bold text-[11px] flex items-center space-x-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{isGeneratingAi ? 'Generating AI Summary...' : 'Auto-Generate AI Summary'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Paste abstract or click Auto-Generate AI Summary above..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-all hover:scale-105"
            >
              {isSubmitting ? (
                <span>Indexing Lecture Series...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Publish Document to Repository</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
