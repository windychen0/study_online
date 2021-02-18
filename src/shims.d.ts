declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '*.ts' {

  enum Role { student = "学生", assistant = "助教", teacher = "教师" }
  enum Sex { male = "男", female = "女" }


  interface Person {
    username: string;
    password: string;
    role: Role;
    name: string;
    sex: Sex;
    number: string; //学号
    schoolId: number;
    collegeId: number;
    majorId: number;
  }

  export default Person
}