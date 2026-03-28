import data from '@/../product/sections/student-platform/data.json'
import { Messages } from './components/Messages'

export default function MessagesPreview() {
  return (
    <Messages
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
      onViewMessages={(courseId) => console.log('View messages:', courseId)}
      onMarkVideoComplete={(enrollmentId, videoId) => console.log('Mark complete:', enrollmentId, videoId)}
    />
  )
}
