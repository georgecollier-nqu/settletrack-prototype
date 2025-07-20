import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create organizations
  const lawFirm = await prisma.organization.upsert({
    where: { name: 'Johnson & Associates Law Firm' },
    update: {},
    create: {
      name: 'Johnson & Associates Law Firm',
      domain: 'johnsonlaw.com',
    },
  });

  const medicalReview = await prisma.organization.upsert({
    where: { name: 'Medical Review Corp' },
    update: {},
    create: {
      name: 'Medical Review Corp',
      domain: 'medreview.com',
    },
  });

  // Hash passwords
  const defaultPassword = await bcrypt.hash('password123', 12);
  
  // Create users
  const jackie = await prisma.user.upsert({
    where: { email: 'jackie@johnsonlaw.com' },
    update: {},
    create: {
      email: 'jackie@johnsonlaw.com',
      password: defaultPassword,
      name: 'Jackie Johnson',
      role: Role.SUPERVISOR,
      organizationId: lawFirm.id,
    },
  });

  const reviewer1 = await prisma.user.upsert({
    where: { email: 'sarah.miller@johnsonlaw.com' },
    update: {},
    create: {
      email: 'sarah.miller@johnsonlaw.com',
      password: defaultPassword,
      name: 'Sarah Miller',
      role: Role.REVIEWER,
      organizationId: lawFirm.id,
    },
  });

  const reviewer2 = await prisma.user.upsert({
    where: { email: 'mike.chen@medreview.com' },
    update: {},
    create: {
      email: 'mike.chen@medreview.com',
      password: defaultPassword,
      name: 'Mike Chen',
      role: Role.REVIEWER,
      organizationId: medicalReview.id,
    },
  });

  const reviewer3 = await prisma.user.upsert({
    where: { email: 'emily.davis@medreview.com' },
    update: {},
    create: {
      email: 'emily.davis@medreview.com',
      password: defaultPassword,
      name: 'Emily Davis',
      role: Role.REVIEWER,
      organizationId: medicalReview.id,
    },
  });

  const regularUser = await prisma.user.upsert({
    where: { email: 'john.doe@johnsonlaw.com' },
    update: {},
    create: {
      email: 'john.doe@johnsonlaw.com',
      password: defaultPassword,
      name: 'John Doe',
      role: Role.USER,
      organizationId: lawFirm.id,
    },
  });

  // Create some sample cases
  const case1 = await prisma.case.create({
    data: {
      caseId: 'CASE-2024-001',
      organizationId: lawFirm.id,
      patientName: 'Jane Smith',
      dob: '1965-05-15',
      gender: 'Female',
      surgeryDate: '2023-11-20',
      surgeryType: 'Total Knee Replacement',
      medicalRecordNumber: 'MRN-123456',
      surgeonName: 'Dr. Michael Roberts',
      hospitalName: 'St. Mary\'s Medical Center',
      preOpDiagnosis: 'Severe osteoarthritis of the left knee',
      postOpDiagnosis: 'Status post left total knee arthroplasty',
      complications: 'Yes',
      complicationDetails: 'Post-operative infection requiring IV antibiotics',
      readmission: 'Yes',
      readmissionReason: 'Surgical site infection',
    },
  });

  const case2 = await prisma.case.create({
    data: {
      caseId: 'CASE-2024-002',
      organizationId: medicalReview.id,
      patientName: 'Robert Johnson',
      dob: '1958-08-22',
      gender: 'Male',
      surgeryDate: '2023-12-15',
      surgeryType: 'Spinal Fusion',
      medicalRecordNumber: 'MRN-789012',
      surgeonName: 'Dr. Lisa Chen',
      hospitalName: 'Regional Spine Center',
      preOpDiagnosis: 'Lumbar spinal stenosis with neurogenic claudication',
      postOpDiagnosis: 'Status post L4-L5 posterior spinal fusion',
      complications: 'No',
    },
  });

  // Create model outputs for comparison
  const geminiOutput1 = await prisma.modelOutput.create({
    data: {
      caseId: case1.id,
      modelName: 'Gemini',
      modelVersion: '1.5-pro',
      outputData: {
        patientName: 'Jane Smith',
        dob: '1965-05-15',
        gender: 'Female',
        surgeryDate: '2023-11-20',
        surgeryType: 'Total Knee Replacement',
        complications: 'Yes',
        complicationDetails: 'Post-op infection requiring antibiotics',
        readmission: 'Yes',
        readmissionReason: 'Infection at surgical site',
      },
      confidence: {
        patientName: 0.99,
        dob: 0.98,
        surgeryType: 0.95,
        complications: 0.92,
      },
    },
  });

  const gptOutput1 = await prisma.modelOutput.create({
    data: {
      caseId: case1.id,
      modelName: 'GPT-4',
      modelVersion: '2024-01',
      outputData: {
        patientName: 'Jane Smith',
        dob: '1965-05-15',
        gender: 'Female',
        surgeryDate: '2023-11-20',
        surgeryType: 'TKR - Total Knee Replacement',
        complications: 'Yes',
        complicationDetails: 'Post-operative infection treated with IV antibiotics',
        readmission: 'Yes',
        readmissionReason: 'SSI - Surgical site infection',
      },
      confidence: {
        patientName: 0.98,
        dob: 0.97,
        surgeryType: 0.93,
        complications: 0.94,
      },
    },
  });

  // Create a QC review
  const qcReview = await prisma.qCReview.create({
    data: {
      caseId: case1.id,
      modelOutput1Id: geminiOutput1.id,
      modelOutput2Id: gptOutput1.id,
      reviewerId: reviewer1.id,
      status: 'IN_REVIEW',
      reviewStartedAt: new Date(),
    },
  });

  console.log('Database seeded successfully!');
  console.log('\nTest credentials:');
  console.log('Supervisor: jackie@johnsonlaw.com / password123');
  console.log('Reviewer: sarah.miller@johnsonlaw.com / password123');
  console.log('Reviewer: mike.chen@medreview.com / password123');
  console.log('Regular User: john.doe@johnsonlaw.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });