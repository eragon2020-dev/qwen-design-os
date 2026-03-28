# Data Shape

## Entities

### User
Represents all platform users including students, lecturers, and admins. Contains authentication credentials, profile information, and role assignment.

### Course
Represents a course created by a lecturer. Contains course details like title, description, thumbnail, and belongs to a specific lecturer.

### Video
Represents individual video lessons within a course. Contains YouTube video links, titles, order/sequence, and belongs to a course.

### Enrollment
Represents a student's enrollment in a course. Tracks enrollment status (pending, approved, rejected), links students to courses, and manages access.

### Payment
Represents a payment slip uploaded by a student for course enrollment. Contains slip image/reference, amount, status (pending, verified, rejected), and links to enrollment.

### Note
Represents notes created by students while watching course videos. Contains note content, links to the specific video and course for easy filtering and retrieval.

### Message
Represents messages exchanged between students and lecturers. Contains message content, sender/receiver information, and can be linked to a specific course for context.

## Relationships

- User has many Courses (as a lecturer)
- Course belongs to User (lecturer)
- Course has many Videos
- Video belongs to Course
- User has many Enrollments (as a student)
- Enrollment belongs to User (student)
- Enrollment belongs to Course
- Enrollment has one Payment
- Payment belongs to Enrollment
- User has many Notes
- Note belongs to User (student)
- Note belongs to Video
- Note belongs to Course
- User has many Messages (as sender or receiver)
- Message belongs to User (sender)
- Message belongs to User (receiver)
- Message can belong to Course (for course-related conversations)
