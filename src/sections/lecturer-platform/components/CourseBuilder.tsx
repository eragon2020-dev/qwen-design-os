import React, { useState } from 'react'
import type { LecturerPlatformProps, VideoLesson } from '@/../product/sections/lecturer-platform/types'
import { Plus, Trash2, GripVertical, Youtube, Save, X, Play } from 'lucide-react'

/**
 * Course Builder - Create and edit courses with video lessons
 */
export function CourseBuilder({
  courses,
  videoLessons,
  onAddVideo,
  onEditCourse,
}: LecturerPlatformProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.id || '')
  const [isEditing, setIsEditing] = useState(false)
  const [showAddVideo, setShowAddVideo] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    level: 'All Levels',
  })

  const [videoForm, setVideoForm] = useState({
    sectionTitle: '',
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '',
  })

  const course = courses.find((c) => c.id === selectedCourse)
  const courseVideos = videoLessons.filter((v) => v.courseId === selectedCourse)

  const groupedVideos = courseVideos.reduce((acc, video) => {
    if (!acc[video.sectionTitle]) {
      acc[video.sectionTitle] = []
    }
    acc[video.sectionTitle].push(video)
    return acc
  }, {} as Record<string, VideoLesson[]>)

  const handleSaveCourse = () => {
    if (course) {
      onEditCourse?.(course.id)
      setIsEditing(false)
    }
  }

  const handleAddVideo = () => {
    if (videoForm.title && videoForm.youtubeUrl && course) {
      onAddVideo?.({
        courseId: course.id,
        sectionTitle: videoForm.sectionTitle || 'New Section',
        title: videoForm.title,
        description: videoForm.description,
        youtubeUrl: videoForm.youtubeUrl,
        duration: parseInt(videoForm.duration) || 600,
      })
      setVideoForm({ sectionTitle: '', title: '', description: '', youtubeUrl: '', duration: '' })
      setShowAddVideo(false)
    }
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return match ? match[1] : null
  }

  if (!course) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No course selected
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Course Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage course content and video lessons
          </p>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Course Details Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Course Details</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors"
            >
              Edit Details
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveCourse}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors flex items-center gap-1"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 text-sm font-medium rounded transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Course Title
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              />
            ) : (
              <p className="text-slate-900 dark:text-white">{course.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Price
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              />
            ) : (
              <p className="text-slate-900 dark:text-white">${course.price}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white resize-none"
              />
            ) : (
              <p className="text-slate-700 dark:text-slate-300">{course.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Video Lessons */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Video Lessons ({courseVideos.length})
          </h2>
          <button
            onClick={() => setShowAddVideo(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Video
          </button>
        </div>

        {Object.entries(groupedVideos).map(([section, videos]) => (
          <div key={section} className="mb-6 last:mb-0">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              {section}
            </h3>
            <div className="space-y-2">
              {videos.map((video, index) => (
                <VideoLessonRow
                  key={video.id}
                  video={video}
                  index={index}
                  getYoutubeId={getYoutubeId}
                />
              ))}
            </div>
          </div>
        ))}

        {courseVideos.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No videos added yet</p>
            <p className="text-sm mt-1">Click "Add Video" to start building your course content</p>
          </div>
        )}
      </div>

      {/* Add Video Modal */}
      {showAddVideo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Video Lesson</h3>
              <button
                onClick={() => setShowAddVideo(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Section Name
                </label>
                <input
                  type="text"
                  value={videoForm.sectionTitle}
                  onChange={(e) => setVideoForm({ ...videoForm, sectionTitle: e.target.value })}
                  placeholder="e.g., Introduction"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g., Getting Started"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={videoForm.youtubeUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={videoForm.duration}
                  onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                  placeholder="600"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Brief description of this lesson..."
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white resize-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleAddVideo}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Add Video
              </button>
              <button
                onClick={() => setShowAddVideo(false)}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface VideoLessonRowProps {
  video: VideoLesson
  index: number
  getYoutubeId: (url: string) => string | null
}

function VideoLessonRow({ video, index, getYoutubeId }: VideoLessonRowProps) {
  const videoId = getYoutubeId(video.youtubeUrl)

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-grab">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-400">
        {index + 1}
      </div>
      {videoId ? (
        <img
          src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
          alt={video.title}
          className="w-20 h-12 object-cover rounded"
        />
      ) : (
        <div className="w-20 h-12 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
          <Youtube className="w-6 h-6 text-slate-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 dark:text-white truncate">{video.title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {formatDuration(video.duration)} • {video.viewCount} views
        </p>
      </div>
      <div className="flex items-center gap-2">
        {video.isFree && (
          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded">
            Free
          </span>
        )}
        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  )
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
