import EducationCard from "./components/EducationCard";
import Section from "./components/Section";
import TechnologyInfoCard from "./components/TechnologyInfoCard";
import EmploymentCard from "./components/EmploymentCard";
import * as React from "react";
import Page from "../Page/Page";


export default function ResumePage() {
    return (
      <Page>
        <div>
          <Section title={"EMPLOYMENT"}>
            <EmploymentCard
              title={"Software Engineer"}
              companyName={"Airbnb"}
              location={"Seattle, WA"}
              employmentDate={"July 2022 - Present"}
              description={[
                "Currently work on the Payments Platform team where I develop and maintain the services that power all financial transactions and billing at Airbnb.",
                "Previously worked on the Listing Backend team where I ensured the reliability and scalability of the company's core listing services and data models. Additionally, I was responsible for designing changes to our architecture and APIs to accommodate new product features."
              ]}/>
            <EmploymentCard
              title={"Software Engineer"}
              companyName={"Meta Platforms (formerly Facebook)"}
              location={"Seattle, WA"}
              employmentDate={"January 2019 - May 2022"}
              description={[
                "Developed new features for Facebook’s mobile buyer surfaces. These included adding support for multi-item checkout as well as writing new post-transactions surfaces, such as receipts.",
                "Led project to merge two major Facebook business applications, Catalog Manager and Commerce Manager. This was a major initiative of Facebook’s push into e-commerce and resulted in a new application where merchants could manage their shop and catalog capabilities in one place."
              ]}/>
            <EmploymentCard
              title={"Software Development Engineer"}
              companyName={"Apptio, Inc."}
              location={"Bellevue, WA"}
              employmentDate={"January 2016 - December 2018"}
              description={[
                "Worked on the design and complete rewrite of a feature which allows users to visualize how money is spent throughout their IT organization.",
                "Led the design and implementation of a feature that allows users to see how money is either over- and/or under-allocated in their IT financial models.",
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
          <Section title={"TECHNOLOGIES"}>
            <TechnologyInfoCard programmingLanguages={["Kotlin", "Java", "JavaScript", "TypeScript"]}
                                technologiesAndTools={["ReactJS", "Spring", "HTML", "CSS", "Git", "Mercurial"]}/>
          </Section>
          <Section title={"EDUCATION"}>
            <EducationCard universityName={"University of Puget Sound"}
                           major={"B.S. In Computer Science"}
                           minor={"Minor in Mathematics and Economics"}
                           graduationDate={"December 2015"}/>
          </Section>
        </div>
      </Page>
    )
  }