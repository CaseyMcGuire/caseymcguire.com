import EducationCard from "./components/EducationCard";
import Section from "./components/Section";
import TechnologyInfoCard from "./components/TechnologyInfoCard";
import EmploymentCard from "./components/EmploymentCard";
import * as React from "react";


export default function ResumePage() {
    return (
        <div>
          <Section title={"EMPLOYMENT"}>
            <EmploymentCard
              title={"Software Engineer"}
              companyName={"Facebook"}
              location={"Seattle, WA"}
              employmentDate={"January 2019 - Present"}
              description={[]}/>
            <EmploymentCard
              title={"Software Development Engineer"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"January 2016 - December 2018"}
              description={[
                "Worked on the design and complete rewrite of a feature which allows users to visualize how money is spent throughout their IT organization.",
                "Led the design and implementation of a feature that allows users to see how money is either over- and/or under-allocated in their IT financial models.",
                "Participated in the development of a new Selenium-based testing framework, which improved the stability of our application. ",
                "Maintained and added new features to application which allows users to create reports for their IT financial data. ",
              ]}/>
            <EmploymentCard
              title={"Software Development Engineer, Intern"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"June 2015 - September 2015"}
              description={[
                "Developed feature that allows clients to design and print reports for Apptio's upcoming flagship web application.",
                "Adapted and debugged existing server-side code to allow for seamless integration of upcoming feature with existing legacy web application."
              ]}/>
          </Section>
          <Section title={"OTHER EXPERIENCE"}>
            <EmploymentCard
              title={"Freelance Developer"}
              companyName={"Printopus"}
              description={[
                "Developed the UI for an Android mobile application, using React Native and Redux, that allows users to have photos on their phones mailed to them in a variety of formats.",
              ]}
              link={{
                text: 'Link',
                href: 'https://play.google.com/store/apps/details?id=us.printop.mobile.android.store&hl=en'
              }}
            />

          </Section>
          <Section title={"TECHNOLOGIES"}>
            <TechnologyInfoCard programmingLanguages={["Java", "JavaScript", "TypeScript"]}
                                technologiesAndTools={["ReactJS", "React Native", "Redux", "HTML", "CSS", "Git", "Mercurial"]}/>
          </Section>
          <Section title={"EDUCATION"}>
            <EducationCard universityName={"University of Puget Sound"}
                           major={"B.S. In Computer Science"}
                           minor={"Minor in Mathematics and Economics"}
                           graduationDate={"December 2015"}/>
          </Section>
        </div>
    )
  }