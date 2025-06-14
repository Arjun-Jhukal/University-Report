"use client";
import { ReportInfoProps } from '@/interface/reportInfo';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react'
import { BiDownload } from 'react-icons/bi'

type TocItem = {
  title: string;
  page: string; // Changed to string to accommodate roman numerals
};

export default function ReportPage() {
  const router = useRouter();
  const [data, setData] = React.useState<ReportInfoProps | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  React.useEffect(() => {
    const storedData = localStorage.getItem('reportInfo');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      router.replace('/');
    }
  }, []);

  // Calculate page numbers and TOC dynamically
  useEffect(() => {
    if (contentRef.current) {
      const pages = Array.from(contentRef.current.querySelectorAll('.preliminary-page .print-page'));
      const newTocItems: TocItem[] = [];

      pages.forEach((page, index) => {
        // Skip cover page in TOC
        if (index === 0) return;

        const titleElement = page.querySelector('h1');
        if (titleElement) {
          const title = titleElement.textContent || '';
          const pageNum = index ? romanNumerals(index) : (index - 4).toString();
          newTocItems.push({ title, page: pageNum });

          const pageNumberElement = document.createElement('div');
          pageNumberElement.className = 'page-number';
          pageNumberElement.style.position = 'absolute';
          pageNumberElement.style.bottom = '20px';
          pageNumberElement.style.right = '20px';
          pageNumberElement.textContent = pageNum;
          page.appendChild(pageNumberElement);
        }
      });

      setTocItems(newTocItems);
    }
  }, [data]);

  // Helper function to convert numbers to Roman numerals
  const romanNumerals = (num: number): string => {
    const roman: Record<number, string> = {
      1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v', 6: 'vi', 7: 'vii', 8: 'viii', 9: 'ix', 10: 'x',
    };
    return roman[num] || num.toString();
  };

  return (
    <>
      <main ref={contentRef}>
        <section className="cover-page my-[1in] mr-[1in] ml-[1.25in] print-page">
          <div className="cover-content text-center">
            <img src="/tu-logo.png" alt="" className='max-w-[160px] mx-auto mb-4' />
            <h1 className='text-uppercase'>{data?.university}</h1>
            <h2>Department of Computer Science and Infomation Technology</h2>
            <h2 className='mt-4'>Internship Report on</h2>
            <h2>{data?.projectName}</h2>
            <h2 className="text-underline mt-4">Submitted To</h2>
            <p>Office of Dean Institute of Science and Technology</p>
            <p>Kathmandu, Nepal</p>
            <h2 className="text-underline mt-4">Under the supervision of</h2>
            <p className="text-uppercase">{data?.supervisor}</p>
            <strong>In partial funfillment of the requirement for the Bachelor of Sience in Computer Science and Information Technology</strong>
            <h2 className="text-underline mt-4">Submitted By</h2>
            <p>{data?.firstName} {data?.lastName}</p>
            <p>{data?.collegeName}</p>
            <p>{data?.collegeAddress}</p>
            <p>Roll Number: {data?.symbolNumber}</p>
            <p>TU Registration Number: {data?.registrationNumber}</p>
            <strong>July 2025</strong>
          </div>
        </section>

        <section className="preliminary-page my-[1in] mr-[1in] ml-[1.25in]">
          {/* Supervisor Recommendation */}
          <div className="page print-page">
            <h1 className="text-uppercase text-center text-xl font-bold">Supervisor&apos;s Recommendation</h1>

            <div className="content mt-6 text-justify leading-relaxed text-[13pt]">
              <p>
                This is to certify that <strong>{data?.firstName} {data?.lastName}</strong>, a student of
                <strong> {data?.collegeName}</strong>, has completed the internship report entitled
                <strong> {`"${data?.projectName}"`}</strong> under my supervision. This report is submitted in partial fulfillment
                of the requirements for the degree of Bachelor of Science in Computer Science and Information Technology
                (B.Sc.CSIT) of Tribhuvan University.
              </p>

              <p className="mt-4">
                To the best of my knowledge, this report is the student’s own work and has been prepared sincerely and accurately.
                I therefore recommend it for evaluation.
              </p>

              <p className="mt-12">
                <strong>Supervisor</strong><br />
                {data?.supervisor}<br />
                {data?.supervisorDepartment || 'Lecturer'}<br />
                {data?.collegeName}<br />
                Internship Supervisor
              </p>
            </div>
          </div>

          {/* Letter of Approval */}
          <div className="page print-page ">
            <h1 className="text-center text-xl font-bold uppercase mb-6">Letter of Approval</h1>

            <p className="text-justify leading-relaxed text-[13pt]">
              This is to certify that the project prepared by <strong>Mr. {data?.firstName} {data?.lastName}</strong> entitled
              <strong className="uppercase"> {`"${data?.projectName} at ${data?.collegeName}"`}</strong> in partial fulfillment of the
              requirements for the degree of Bachelor of Computer Application has been well studied. In our opinion,
              it is satisfactory in the scope and quality as a project for the required degree.
            </p>

            {/* Signature Table */}
            <table className="w-full border mt-10 text-[13pt] table-fixed">
              <tbody>
                <tr>
                  <td className="border p-4 text-center align-top">
                    <p className="mb-6">…………………………</p>
                    <p className="font-bold">Project Supervisor</p>
                    <p>Mr. Raj Singh Jora</p>
                    <p>Ambikeshwari Campus</p>
                    <p>Ghorahi, Dang</p>
                  </td>
                  <td className="border p-4 text-center align-top">
                    <p className="mb-6">…………………………</p>
                    <p className="font-bold">Coordinator</p>
                    <p>Mr. Nab Raj Basel</p>
                    <p>Ambikeshwari Campus</p>
                    <p>Ghorahi, Dang</p>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 text-center align-top">
                    <p className="mb-6">…………………………</p>
                    <p className="font-bold">Internship Mentor</p>
                    <p>Er. Pawan Adhikari</p>
                    <p>Ambikeshwari Campus</p>
                    <p>Ghorahi, Dang</p>
                  </td>
                  <td className="border p-4 text-center align-top">
                    <p className="mb-6">…………………………</p>
                    <p className="font-bold">External Examiner</p>
                    <p>(Lecturer, FOHSS, TU)</p>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          {/* Acknowledgement */}
          <div className="page print-page">
            <h1 className="text-uppercase text-center text-xl font-bold">Acknowledgement</h1>
            <div className="content mt-6 text-justify leading-relaxed text-[13pt]">
              <p>
                First and foremost, I would like to express my sincere gratitude to my supervisor
                <strong> {data?.supervisor} </strong> for their valuable guidance, continuous support, and encouragement
                throughout the internship period and during the preparation of this report.
              </p>

              <p className="mt-4">
                I would also like to thank the faculty members of the
                <strong> Department of Computer Science and Information Technology</strong>,
                <strong> {data?.collegeName} </strong>, for their academic support.
              </p>

              <p className="mt-4">
                My heartfelt thanks go to the organization where I completed my internship for providing me with this opportunity,
                and to all the colleagues who supported me during this learning experience.
              </p>

              <p className="mt-4">
                Lastly, I am thankful to my friends and family for their motivation and constant encouragement throughout this journey.
              </p>
            </div>
          </div>

          {/* Abstract */}
          <div className="page print-page ">
            <h1 className="text-uppercase text-center text-xl font-bold">Abstract</h1>
            <div className="content mt-6 text-justify leading-relaxed text-[13pt]">
              <p>
                This report presents a comprehensive overview of the internship project titled
                <strong> {`"${data?.projectName}"`} </strong> carried out at [Company Name].
                The primary objective of the internship was to gain practical experience and enhance the technical
                skills acquired during the academic years of the B.Sc.CSIT program.
              </p>

              <p className="mt-4">
                The report discusses the tools and technologies used, challenges encountered, and solutions implemented
                during the project. It reflects the real-world working environment and highlights the knowledge gained
                in system design, development, and project management.
              </p>

              <p className="mt-4">
                Overall, the internship has been a valuable experience contributing to both professional and personal growth,
                and this report encapsulates the journey, outcomes, and learning.
              </p>
            </div>
          </div>

          {/* Table of Content */}
          <div className="page print-page">
            <h1>Table of Contents</h1>
            <div className="mt-6">
              <table className="w-full">
                <tbody>
                  {tocItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.title}
                      </td>
                      <td className="text-right py-1" style={{ width: '50px' }}>
                        {item.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* List of Abbreviations */}
          <div className="page print-page">
            <h1>List of Abbreviations</h1>
            <div className="mt-6">
              <table className="w-full">
                <tbody>
                  {tocItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.title}
                      </td>
                      <td className="text-right py-1" style={{ width: '50px' }}>
                        {item.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* List of Figures */}
          <div className="page print-page">
            <h1>List of Figure</h1>
            <div className="mt-6">
              <table className="w-full">
                <tbody>
                  {tocItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.title}
                      </td>
                      <td className="text-right py-1" style={{ width: '50px' }}>
                        {item.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* List of Table */}
          <div className="page print-page">
            <h1>List of Table</h1>
            <div className="mt-6">
              <table className="w-full">
                <tbody>
                  {tocItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-1">
                        {item.title}
                      </td>
                      <td className="text-right py-1" style={{ width: '50px' }}>
                        {item.page}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        <button
          onClick={() => window.print()}
          className="print bg-secondary fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg hover:bg-secondary-dark transition-colors cursor-pointer"
        >
          <span>Download Report</span>
          <span>
            <BiDownload />
          </span>
        </button>
      </main>
    </>
  )
}
