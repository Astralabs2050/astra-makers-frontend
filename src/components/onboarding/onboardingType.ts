export interface OnboardingProps {
  email: string;
  password: string;
  fullName: string;
  profileImage: string;
  location: string;
  category: string[];
  skills: string[];
  creatorType: "digital" | "physical";
  work: {
    title: string;
    description: string;
    companyName: string;
    startDate: string;
    endDate: string;
  }[];

  projects: {
    title: string;
    projectDescription: string;
    tags: string[];
    image: string[];
  }[];
}
