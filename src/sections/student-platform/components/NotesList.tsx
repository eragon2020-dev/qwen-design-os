import React, { useState } from 'react'
import type { StudentPlatformProps, Note } from '@/../product/sections/student-platform/types'
import { Search, Filter, Edit2, Trash2, JumpTo, BookOpen } from 'lucide-react'

/**
 * Notes List - View and manage all notes with search and filter
 */
export function NotesList({
  notes,
  enrollments,
  onEditNote,
  onDeleteNote,
  onJumpToTimestamp,
}: StudentPlatformProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')

  const courses = enrollments?.map((e) => ({ id: e.courseId, title: e.courseTitle })) || []
  const uniqueCourses = courses.filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)

  const filteredNotes = notes?.filter((note) => {
    const matchesSearch =
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = !selectedCourse || note.courseId === selectedCourse
    return matchesSearch && matchesCourse
  })

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

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
          My Notes
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {notes.length} notes across {uniqueCourses.length} courses
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by content or video title..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
          />
        </div>
        <div className="sm:w-64">
          <select
            value={selectedCourse || ''}
            onChange={(e) => setSelectedCourse(e.target.value || null)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
          >
            <option value="">All Courses</option>
            {uniqueCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isEditing={editingNoteId === note.id}
              editContent={editingContent}
              onEdit={() => handleStartEdit(note)}
              onSave={() => handleSaveEdit(note.id)}
              onCancel={() => {
                setEditingNoteId(null)
                setEditingContent('')
              }}
              onContentChange={setEditingContent}
              onDelete={() => onDeleteNote?.(note.id)}
              onJump={() => onJumpToTimestamp?.(note)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {searchQuery || selectedCourse ? 'No matching notes' : 'No notes yet'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchQuery || selectedCourse
              ? 'Try adjusting your search or filters'
              : 'Start taking notes while watching videos to capture key points'}
          </p>
        </div>
      )}
    </div>
  )
}

interface NoteCardProps {
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

function NoteCard({ note, isEditing, editContent, onEdit, onSave, onCancel, onContentChange, onDelete, onJump }: NoteCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-medium rounded-full">
            {note.courseTitle}
          </span>
          <button
            onClick={onJump}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <JumpTo className="w-3 h-3" />
            {formatTimestamp(note.timestamp)}
          </button>
        </div>
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs rounded hover:bg-slate-300 dark:hover:bg-slate-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              >
                <Edit2 className="w-4 h-4 text-slate-500" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-3 dark:text-white resize-none"
          rows={3}
        />
      ) : (
        <p className="text-slate-700 dark:text-slate-300 mb-2">{note.content}</p>
      )}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="truncate">{note.videoTitle}</span>
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
