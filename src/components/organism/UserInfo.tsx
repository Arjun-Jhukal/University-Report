"use client"
import React from 'react'
import InputField from '../atom/inputField'
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReportInfoProps } from '@/interface/reportInfo';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    projectName: Yup.string().required('Project Name is required'),
    symbolNumber: Yup.string().required('Symbol Number is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    collegeName: Yup.string().required('College Name is required'),
    collegeAddress: Yup.string().required('College Address is required'),
    supervisor: Yup.string().required('Supervisor Name is required'),
    supervisorDepartment: Yup.string().required('Supervisor Department is required'),
});
export default function ReportBasicInfo() {
    const route = useRouter();

    const reportInitialState: ReportInfoProps = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        projectName: '',
        symbolNumber: '',
        registrationNumber: '',
        collegeName: '',
        collegeAddress: '',
        supervisor: '',
        supervisorDepartment: '',
        university: 'Tribhuwan University',
    }

    const formik = useFormik({
        initialValues: reportInitialState,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            try {
                localStorage.setItem('reportInfo', JSON.stringify(values));

                console.log("Form Values:", values);
                route.replace('/report');
            }
            catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    });

    return (
        <section className='min-h-screen flex items-center justify-center bg-gray-100 py-16 lg:py-[120px]'>
            <div className='container'>
                <div className="section-title">
                    <h1 ><span>Internship</span> Report BSc CSIT 8th SEM.</h1>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <h2 className='text-start lg:text-[24px]'>Personal Information</h2>
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="firstName" name="firstName" label="First Name" value={formik.values.firstName} onChange={formik.handleChange} error={formik.touched && formik.errors.firstName} placeholder='Arjun' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="lastName" name="lastName" label="Last Name" value={formik.values.lastName} onChange={formik.handleChange} error={formik.touched && formik.errors.lastName} placeholder='Jhukal' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="email" name="email" label="Email Address" value={formik.values.email} onChange={formik.handleChange} error={formik.touched && formik.errors.email} placeholder='connectjhukal@gmail.com' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="phoneNumber" name="phoneNumber" label="Phone Number" value={formik.values.phoneNumber} onChange={formik.handleChange} error={formik.touched && formik.errors.phoneNumber} placeholder='981276****' />
                    </div>
                    <div className="md:col-span-2">
                        <InputField id="projectName" name="projectName" label="Project Name" value={formik.values.projectName} onChange={formik.handleChange} error={formik.touched && formik.errors.projectName} placeholder='Natural Language Processor' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="symbolNumber" name="symbolNumber" label="TU Symbol Number" value={formik.values.symbolNumber} onChange={formik.handleChange} error={formik.touched && formik.errors.symbolNumber} placeholder='21032' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="registrationNumber" name="registrationNumber" label="TU Symbol Number"
                            note=" (please use '-' appropriately)" value={formik.values.registrationNumber} onChange={formik.handleChange} error={formik.touched && formik.errors.registrationNumber} placeholder='5-2-33-54-2018' />
                    </div>
                    <div className="md:col-span-2">
                        <h2 className='text-start lg:text-[24px]'>
                            College & Supervisor
                        </h2>
                    </div>
                    <div className="md:col-span-2">
                        <InputField id="collegeName" name="collegeName" label="College Name" value={formik.values.collegeName} onChange={formik.handleChange} error={formik.touched && formik.errors.collegeName} placeholder='Madan Bhandari Memorial College' />
                    </div>
                    <div className="md:col-span-2">
                        <InputField id="collegeAddress" name="collegeAddress" label="College Address" value={formik.values.collegeAddress} onChange={formik.handleChange} error={formik.touched && formik.errors.collegeAddress} placeholder='Binayaknagar, Kathmandu' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="supervisor" name="supervisor" label="Supervisor Name" value={formik.values.supervisor} onChange={formik.handleChange} error={formik.touched && formik.errors.supervisor} placeholder='Mr. Arjun Jhukal HOD' />
                    </div>
                    <div className="md:col-span-1">
                        <InputField id="supervisorDepartment" name="supervisorDepartment" label="Supervisor Department" value={formik.values.supervisorDepartment} onChange={formik.handleChange} error={formik.touched && formik.errors.supervisorDepartment} placeholder='Department of Computer Science and Information Technology' />
                    </div>

                    <div className="md:col-span-1">
                        <InputField id="university" name="university" label="University" value='Tribhuwan University' disabled />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className='btn-primary' onClick={() => formik.handleSubmit()}>Start Working On Report</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
