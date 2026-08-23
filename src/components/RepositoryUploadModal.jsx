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
  GraduationCap,
  BookMarked,
  Layers,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';
import { NACETEM_COLLECTIONS, DOCUMENT_TYPES, LECTURE_SERIES_OPTIONS, POSTGRADUATE_COURSES_OPTIONS } from '../data/mockLibraryData';
import { savePdfToStorage } from '../utils/pdfStorage';

export default function RepositoryUploadModal({ isOpen, onClose, onUploadBook, currentUser }) {
  const defaultAuthorName = currentUser?.name && !currentUser.name.includes('@') && !currentUser.name.toLowerCase().includes('staff') 
    ? currentUser.name 
    : 'Abubakar Rufai';

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authors, setAuthors] = useState(defaultAuthorName);
  const [pubYear, setPubYear] = useState('2026');
  const [publisher, setPublisher] = useState('National Centre for Technology Management (NACETEM)');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [customDoi, setCustomDoi] = useState('');
  const [category, setCategory] = useState('AI & Emerging Tech');
  const [lectureSeriesSub, setLectureSeriesSub] = useState('ICT Lecture Series');
  const [pgCourseSub, setPgCourseSub] = useState('M.Tech Technology Management');
  const [type, setType] = useState('Research Paper');
  const [abstract, setAbstract] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [policyRecommendations, setPolicyRecommendations] = useState('');
  
  // Real File Upload State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfDataUrl, setPdfDataUrl] = useState('');
  const [fileError, setFileError] = useState('');

  // Multi-Component / Chapter Upload State
  const [enableComponents, setEnableComponents] = useState(false);
  const [componentsList, setComponentsList] = useState([
    { id: 1, title: 'Chapter 1: Abstract & Introduction', file: null, dataUrl: '', startPage: 1 },
    { id: 2, title: 'Chapter 2: Literature Review & Framework', file: null, dataUrl: '', startPage: 12 },
    { id: 3, title: 'Chapter 3: Methodology & Empirical Results', file: null, dataUrl: '', startPage: 25 }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileError('');
    
    if (file.size > 50 * 1024 * 1024) {
      setUploadedFile(null);
      setFileError('File exceeds 50 MB deposit limit.');
      return;
    }

    setUploadedFile(file);

    // Read raw file byte-for-byte as Data URL
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPdfDataUrl(evt.target.result);
    };
    reader.readAsDataURL(file);

    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    if (!title) setTitle(cleanName);
    if (!authors) setAuthors(defaultAuthorName);
    
    const autoAbstract = `Official document "${file.name}" deposited into the NACETEM ${category} by ${authors || defaultAuthorName}. Full document preserved for 100% online reading and direct PDF/Word download.`;
    if (!abstract) setAbstract(autoAbstract);
  };

  const handleComponentFileChange = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const updated = [...componentsList];
      updated[idx].file = file;
      updated[idx].dataUrl = evt.target.result;
      setComponentsList(updated);
    };
    reader.readAsDataURL(file);
  };

  const addComponentItem = () => {
    setComponentsList([
      ...componentsList,
      { id: Date.now(), title: `Chapter ${componentsList.length + 1}: Section Title`, file: null, dataUrl: '', startPage: (componentsList.length + 1) * 10 }
    ]);
  };

  const removeComponentItem = (idx) => {
    setComponentsList(componentsList.filter((_, i) => i !== idx));
  };

  const handleAutoGenerateAiSummary = () => {
    const activeTitle = title || (uploadedFile ? uploadedFile.name : 'Research Publication');
    setIsGeneratingAi(true);

    setTimeout(() => {
      const generatedTakeaways = [
        `Presents strategic findings and capacity metrics for ${activeTitle}.`,
        `Outlines key operational principles, technological readiness levels, and governance matrices.`,
        `Establishes empirical benchmarks for evaluating national STI infrastructure.`
      ].join('\n');

      const generatedPolicy = [
        `Implement standardized inter-agency coordination protocols.`,
        `Allocate dedicated funding for continuous institutional skill development.`
      ].join('\n');

      if (!abstract) {
        setAbstract(`Landmark STI publication on ${activeTitle}. The research provides actionable methods for institutional technology management and strategic policy design.`);
      }

      setKeyTakeaways(generatedTakeaways);
      setPolicyRecommendations(generatedPolicy);
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalTitle = title.trim() || (uploadedFile ? uploadedFile.name : `${category} Document`);
    const finalAuthors = authors.trim() ? authors.split(/;|,/).map(a => a.trim()).filter(Boolean) : [defaultAuthorName];
    const finalAbstract = abstract.trim() || `Official document "${finalTitle}" deposited under ${category} by ${finalAuthors.join(', ')}. Full text preserved for online reading and direct file download.`;

    if (!uploadedFile && !pdfDataUrl) {
      setFileError('Please select a PDF, Word, or PowerPoint file to publish.');
      return;
    }

    setIsSubmitting(true);

    try {
      const paperId = `user-paper-${Date.now()}`;

      // 1. Save main PDF Data URL into IndexedDB
      if (pdfDataUrl) {
        await savePdfToStorage(paperId, pdfDataUrl);
      }

      // 2. Save component chapter files into IndexedDB
      const processedComponents = [];
      if (enableComponents) {
        for (let i = 0; i < componentsList.length; i++) {
          const comp = componentsList[i];
          const compKey = `${paperId}_comp_${i}`;
          if (comp.dataUrl) {
            await savePdfToStorage(compKey, comp.dataUrl);
          }
          processedComponents.push({
            id: compKey,
            title: comp.title,
            startPage: comp.startPage,
            fileName: comp.file ? comp.file.name : `${comp.title}.pdf`,
            fileSize: comp.file ? (comp.file.size / 1024).toFixed(1) + ' KB' : 'PDF Document'
          });
        }
      }

      const takeawaysArr = keyTakeaways ? keyTakeaways.split('\n').filter(Boolean) : [
        `Presents STI capacity building frameworks for ${category}.`,
        'Provides actionable policy recommendations.'
      ];

      const policyArr = policyRecommendations ? policyRecommendations.split('\n').filter(Boolean) : [
        'Standardize STI departmental research repositories.',
        'Establish continuous professional skill development modules.'
      ];

      const newDoc = {
        id: paperId,
        isUserUploaded: true,
        uploadedBy: currentUser?.name || defaultAuthorName,
        title: finalTitle,
        subtitle: subtitle.trim() || category,
        authors: finalAuthors,
        institution: `${publisher.trim()} (${category})`,
        publisher: publisher.trim() || 'National Centre for Technology Management (NACETEM)',
        category,
        type,
        year: parseInt(pubYear) || 2026,
        doi: customDoi.trim() || '10.5281/nacetem.2026.001',
        volume: volume.trim(),
        issue: issue.trim(),
        pages: pages.trim(),
        isbn: '',
        accessLevel: 'Open Access',
        rating: 5.0,
        citationsCount: 0,
        downloadsCount: 0,
        coverColor: 'from-emerald-600 via-teal-800 to-slate-900',
        coverAccent: '#059669',
        featured: true,
        audioAvailable: true,
        uploadedFileName: uploadedFile ? uploadedFile.name : 'Uploaded_Document.pdf',
        pdfDataUrl: pdfDataUrl,
        components: processedComponents,
        abstract: finalAbstract,
        keyTakeaways: takeawaysArr,
        policyRecommendations: policyArr,
        fullText: [
          {
            sectionTitle: 'Executive Summary & Publication Overview',
            content: `${finalAbstract}\n\nKey Takeaways:\n${takeawaysArr.map(t => '• ' + t).join('\n')}`
          }
        ]
      };

      await onUploadBook(newDoc);
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      setFileError(error.message || 'Upload failed. Please try again.');
      setIsSubmitting(false);
    }
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
              <h2 className="font-extrabold text-lg text-slate-900">Upload Research Paper / Document</h2>
              <p className="text-xs text-slate-500 font-medium">Original PDF, Word, or PowerPoint file preserved byte-for-byte</p>
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
          accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.epub"
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
                Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Preserved Intact
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <UploadCloud className="w-8 h-8 mx-auto text-emerald-700 animate-bounce" />
              <p className="font-extrabold text-xs text-slate-900">Click to Select Master PDF, Word, or PowerPoint File</p>
              <p className="text-[11px] text-slate-500">Supports .pdf, .docx, .doc, .pptx files up to 50 MB.</p>
            </div>
          )}
        </div>
        {fileError && <p role="alert" className="text-xs font-semibold text-red-700">{fileError}</p>}

        {/* Multi-Component / Chapter Upload Toggle */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-purple-700" />
              <div>
                <h4 className="font-extrabold text-xs text-purple-950">Upload Paper in Chapters / Components (Optional)</h4>
                <p className="text-[11px] text-purple-700">Allows readers to open or download specific chapters separately</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEnableComponents(!enableComponents)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                enableComponents ? 'bg-purple-700 text-white' : 'bg-white border border-purple-300 text-purple-900'
              }`}
            >
              {enableComponents ? 'Components Active' : 'Enable Chapters'}
            </button>
          </div>

          {enableComponents && (
            <div className="space-y-3 pt-2">
              {componentsList.map((comp, idx) => (
                <div key={comp.id} className="p-3 bg-white border border-purple-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={comp.title}
                      onChange={(e) => {
                        const updated = [...componentsList];
                        updated[idx].title = e.target.value;
                        setComponentsList(updated);
                      }}
                      placeholder="e.g. Chapter 1: Introduction"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeComponentItem(idx)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold px-3 py-1 rounded-lg text-[11px] flex items-center space-x-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{comp.file ? comp.file.name : 'Attach Chapter PDF/File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,.pptx,.ppt"
                        onChange={(e) => handleComponentFileChange(idx, e)}
                        className="hidden"
                      />
                    </label>
                    <div className="flex items-center space-x-1 text-[11px]">
                      <span className="text-slate-500 font-semibold">Start Page:</span>
                      <input
                        type="number"
                        value={comp.startPage}
                        onChange={(e) => {
                          const updated = [...componentsList];
                          updated[idx].startPage = parseInt(e.target.value) || 1;
                          setComponentsList(updated);
                        }}
                        className="w-14 bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addComponentItem}
                className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4 text-purple-700" />
                <span>Add Another Chapter / Component</span>
              </button>
            </div>
          )}
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div className="space-y-1">
            <label className="text-slate-800 font-bold flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Document / Publication Title *</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Appraising Institutional Capacity for Technology Transfer in Nigeria"
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
                <span>Publication Year * (e.g. 2026)</span>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-800 font-bold flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-emerald-700" />
                <span>Journal / Publisher Name</span>
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
                placeholder="10.5281/nacetem.2026.001"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-semibold font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-slate-800 font-bold">Document Abstract</label>
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
                <span>Archiving Paper...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Publish Paper Intact</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
