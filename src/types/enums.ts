enum EUserStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE',
  BANNED = 'BANNED',
}

enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EXPERT = 'EXPERT',
}

enum ECourseStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

enum ECommentStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}


enum ECourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

enum ELessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT'
}

enum EOrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

enum ECouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}

enum ERatingStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE',
}

enum ECouponStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE',
}

export { 
  EUserStatus, EUserRole, ECourseStatus, ECommentStatus,
  ECourseLevel, ELessonType, EOrderStatus, ECouponType, ERatingStatus 
}
