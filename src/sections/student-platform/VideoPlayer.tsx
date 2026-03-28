import data from '@/../product/sections/student-platform/data.json'
import { VideoPlayer } from './components/VideoPlayer'

export default function VideoPlayerPreview() {
  return (
    <VideoPlayer
      enrollments={data.enrollments}
      videoProgress={data.videoProgress}
      notes={data.notes}
      messages={data.messages}
      courseProgress={data.courseProgress}
      onContinueWatching={(enrollmentId) => console.log('Continue watching:', enrollmentId)}
      onViewCourse={(courseId) => console.log('View course:', courseId)}
      onCreateNote={(noteData) => console.log('Create note:', noteData)}
      onEditNote={(noteId, content) => console.log('Edit note:', noteId, content)}
      onDeleteNote={(noteId) => console.log('Delete note:', noteId)}
      onJumpToTimestamp={(note) => console.log('Jump to timestamp:', note)}
      onSendMessage={(msgData) => console.log('Send message:', msgData)}
      onMarkVideoComplete={(enrollmentId, videoId) => console.log('Mark complete:', enrollmentId, videoId)}
    />
  )
}
