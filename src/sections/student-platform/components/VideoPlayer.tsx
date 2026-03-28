import React, { useState } from 'react'
import type { StudentPlatformProps, VideoProgress, Note } from '@/../product/sections/student-platform/types'
import { Play, Pause, CheckCircle, Circle, ChevronDown, ChevronUp, Plus, X, Edit2, Trash2, JumpTo } from 'lucide-react'

/**
 * Video Player - Course content viewer with video, sidebar, and notes panel
 */
export function VideoPlayer({
  enrollments,
  videoProgress,
  notes,
  onContinueWatching,
  onMarkVideoComplete,
  onCreateNote,
  onEditNote,
  onDeleteNote,
  onJumpToTimestamp,
}: StudentPlatformProps) {
  const [showNotes, setShowNotes] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNote, setCurrentNote] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')

  // For preview, use first active enrollment
  const currentEnrollment = enrollments?.find((e) => e.status === 'active') || enrollments?.[0]

  // Mock video lessons for the course
  const lessons = [
    { id: 'vid_001', title: 'Introduction to React', duration: 480, completed: true, section: 'Introduction' },
    { id: 'vid_002', title: 'Setting Up Development Environment', duration: 720, completed: true, section: 'Introduction' },
    { id: 'vid_008', title: 'useState Hook Explained', duration: 900, completed: true, section: 'Hooks Basics' },
    { id: 'vid_012', title: 'useEffect Deep Dive', duration: 1080, completed: false, current: true, section: 'Hooks Basics' },
    { id: 'vid_015', title: 'Building Forms with React Hooks', duration: 720, completed: false, section: 'Forms' },
    { id: 'vid_018', title: 'Context API Tutorial', duration: 840, completed: false, section: 'State Management' },
    { id: 'vid_022', title: 'Redux Toolkit Basics', duration: 960, completed: false, section: 'State Management' },
  ]

  const currentLesson = lessons?.find((l) => l.current) || lessons?.find((l) => !l.completed) || lessons?.[0]
  const courseNotes = notes?.filter((n) => n.courseId === currentEnrollment?.courseId) || []

  const handleAddNote = () => {
    if (currentNote.trim() && currentEnrollment && currentLesson) {
      onCreateNote?.({
        courseId: currentEnrollment.courseId,
        videoId: currentLesson.id,
        videoTitle: currentLesson.title,
        timestamp: 180, // Mock current time
        content: currentNote,
      })
      setCurrentNote('')
    }
  }

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id)
    setEditingContent(note.content)
  }

  const handleSaveEdit = (noteId: string) => {
    if (editingContent.trim()) {
      onEditNote?.(noteId, editingContent)
      setEditingNoteId(null)
      setEditingContent('')
    }
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null)
    setEditingContent('')
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {!currentEnrollment ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Course Selected</h2>
            <p className="text-slate-600 dark:text-slate-400">Select a course from your dashboard to start learning</p>
          </div>
        </div>
      ) : (
        <>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player */}
        <div className="bg-black aspect-video relative flex items-center justify-center">
          <img
            src={currentEnrollment?.courseThumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-slate-900" />
              ) : (
                <Play className="w-8 h-8 text-slate-900 ml-1" />
              )}
            </button>
          </div>
          {/* Video Controls Mock */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-indigo-400">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="flex-1 bg-white/20 rounded-full h-1">
                <div className="bg-indigo-500 rounded-full h-1 w-1/4" />
              </div>
              <span className="text-white text-sm">3:00 / {formatDuration(currentLesson.duration)}</span>
            </div>
          </div>
        </div>

        {/* Video Info & Notes Toggle */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{currentLesson.title}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">{currentEnrollment?.courseTitle}</p>
            </div>
            <button
              onClick={() => onMarkVideoComplete?.(currentEnrollment!.id, currentLesson.id)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </button>
          </div>

          {/* Add Note Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Take a note at current timestamp..."
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            />
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Course Content & Notes */}
      <div className={`w-80 lg:w-96 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col ${showNotes ? '' : 'hidden lg:flex'}`}>
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button className="flex-1 px-4 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400">
            Course Content
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white relative">
            Notes
            {courseNotes.length > 0 && (
              <span className="absolute top-2 right-4 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                {courseNotes.length}
              </span>
            )}
          </button>
        </div>

        {/* Course Content List */}
        <div className="flex-1 overflow-y-auto">
          {lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={index}
              onClick={() => onContinueWatching?.(currentEnrollment!.id)}
            />
          ))}
        </div>
      </div>

      {/* Notes Panel (Slide-over on mobile) */}
      {showNotes && (
        <div className="w-80 lg:w-96 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">Notes ({courseNotes.length})</h3>
            <button
              onClick={() => setShowNotes(false)}
              className="lg:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {courseNotes.length > 0 ? (
              courseNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isEditing={editingNoteId === note.id}
                  editContent={editingContent}
                  onEdit={() => handleStartEdit(note)}
                  onSave={() => handleSaveEdit(note.id)}
                  onCancel={handleCancelEdit}
                  onContentChange={setEditingContent}
                  onDelete={() => onDeleteNote?.(note.id)}
                  onJump={() => onJumpToTimestamp?.(note)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <p className="text-sm">No notes yet</p>
                <p className="text-xs mt-1">Add notes while watching to capture key points</p>
              </div>
            )}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  )
}

// Sub-components

interface LessonItemProps {
  lesson: { id: string; title: string; duration: number; completed: boolean; current?: boolean; section: string }
  index: number
  onClick?: () => void
}

function LessonItem({ lesson, index, onClick }: LessonItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer transition-colors ${
        lesson.current
          ? 'bg-indigo-50 dark:bg-indigo-900/20'
          : 'hover:bg-slate-50 dark:hover:bg-slate-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {lesson.completed ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : lesson.current ? (
            <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
            </div>
          ) : (
            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${lesson.current ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
            {lesson.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDuration(lesson.duration)}</p>
        </div>
      </div>
    </div>
  )
}

interface NoteItemProps {
  note: Note
  isEditing: boolean
  editContent: string
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onContentChange: (content: string) => void
  onDelete: () => void
  onJump: () => void
}

function NoteItem({ note, isEditing, editContent, onEdit, onSave, onCancel, onContentChange, onDelete, onJump }: NoteItemProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 group">
      <div className="flex items-start justify-between mb-2">
        <button
          onClick={onJump}
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <JumpTo className="w-3 h-3" />
          {formatTimestamp(note.timestamp)}
        </button>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
            <Edit2 className="w-3 h-3 text-slate-500" />
          </button>
          <button onClick={onDelete} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded p-2 dark:text-white resize-none"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={onSave}
              className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs rounded hover:bg-slate-300 dark:hover:bg-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-700 dark:text-slate-300">{note.content}</p>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 truncate">{note.videoTitle}</p>
    </div>
  )
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
