import { BloodGroup, Gender, MaritalStatus } from '@prisma/client';
import { z } from 'zod';

// updatePatient
const updatePatient = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string!',
      })
      .trim()
      .min(5, { message: 'Name must have minimum 5 characters!' })
      .max(30, { message: "Name can't exceed 30 characters!" })
      .optional(),

    contactNumber: z
      .string({
        invalid_type_error: 'Contact number must be string!',
      })
      .trim()
      .optional(),

    address: z
      .string({
        invalid_type_error: 'Address must be string!',
      })
      .trim()
      .optional(),

    medicalReport: z
      .object({
        reportName: z
          .string({ invalid_type_error: 'Report name must be string!' })
          .trim(),
        reportLink: z
          .string({ invalid_type_error: 'Report link must be string!' })
          .trim(),
      })
      .optional(),

    patientHealthData: z
      .object({
        gender: z.enum(
          [Gender.MALE, Gender.FEMALE],
          {
            errorMap: () => ({
              message: "Gender must be one of 'MALE' and 'FEMALE'!",
            }),
          }
          // {
          //   required_error: 'Gender is required!',
          //   invalid_type_error: 'Invalid Gender value!',
          // }
        ),

        dateOfBirth: z.string({
          required_error: 'Date of birth is required!',
          invalid_type_error: 'Date of Birth must be a string!',
        }),

        bloodGroup: z.enum(
          [
            BloodGroup.A_POSITIVE,
            BloodGroup.A_NEGATIVE,
            BloodGroup.B_POSITIVE,
            BloodGroup.B_NEGATIVE,
            BloodGroup.AB_POSITIVE,
            BloodGroup.AB_NEGATIVE,
            BloodGroup.O_POSITIVE,
            BloodGroup.O_NEGATIVE,
          ],
          {
            errorMap: () => ({
              message:
                "Blood Group must be one of 'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE' and 'O_NEGATIVE'!",
            }),
          }
          // {
          //   required_error: 'Blood group is required!',
          //   invalid_type_error: 'Invalid Blood Group value!',
          // }
        ),

        hasAllergies: z
          .boolean({
            invalid_type_error: 'Have Allergies must be boolean!',
          })
          .optional(),

        hasDiabetes: z
          .boolean({
            invalid_type_error: 'Have Diabetes must be boolean!',
          })
          .optional(),

        height: z
          .string({
            required_error: 'Height is required!',
            invalid_type_error: 'Height must be string!',
          })
          .trim(),

        weight: z
          .string({
            required_error: 'Weight is required!',
            invalid_type_error: 'Weight must be string!',
          })
          .trim(),

        smokingStatus: z
          .boolean({
            invalid_type_error: 'Smoking status must be boolean!',
          })
          .optional(),

        dietaryPreferences: z
          .string({ invalid_type_error: 'Dietary Preferences must be string!' })
          .trim()
          .optional(),

        pregnancyStatus: z
          .boolean({
            invalid_type_error: 'Pregnancy status must be boolean!',
          })
          .optional(),

        mentalHealthHistory: z
          .string({
            invalid_type_error: 'Mental Health History must be string!',
          })
          .trim()
          .optional(),

        immunizationStatus: z
          .string({ invalid_type_error: 'Immunization Status must be string!' })
          .trim()
          .optional(),

        hasPastSurgeries: z
          .boolean({
            invalid_type_error: 'Have Past Surgeries must be boolean!',
          })
          .optional(),

        recentAnxiety: z
          .boolean({
            invalid_type_error: 'Recent Anxiety must be boolean!',
          })
          .optional(),

        recentDepression: z
          .boolean({
            invalid_type_error: 'Recent Depression must be boolean!',
          })
          .optional(),

        maritalStatus: z.enum(
          [MaritalStatus.MARRIED, MaritalStatus.UNMARRIED],
          {
            errorMap: () => ({
              message:
                "Marital status must be one of 'MARRIED' and 'UNMARRIED'!",
            }),
          }
          // {
          //   required_error: 'Marital status is required!',
          //   invalid_type_error: 'Invalid Marital Status!',
          // }
        ),
      })
      .optional(),
  }),
});

export const patientValidationSchemas = {
  updatePatient,
};
