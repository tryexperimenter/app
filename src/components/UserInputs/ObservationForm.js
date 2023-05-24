/*Sources: 
Logic: https://www.bezkoder.com/react-crud-web-api/
UI: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/landing
    https://github.com/creativetimofficial/tailwind-starter-kit/blob/main/Landing%20Page/react-landing-page/src/views/Landing.js
    https://www.smashingmagazine.com/2020/10/react-validation-formik-yup/
    https://formik.org/docs/tutorial
    https://github.com/JOHNFLEURIMOND/MERNStackForm/blob/master/src/App.js
    https://dev.to/przpiw/build-elegant-forms-reactformik-tailwind-54d8
    https://blog.logrocket.com/building-forms-formik-react/#form-submission-process-formik
*/

import React, { useState } from "react";
import DOMPurify from 'isomorphic-dompurify';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BackendAPIDataService } from "services/BackendAPIDataService"

/*Enable us to use a sleep function*/
const seconds_to_sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * seconds));

/*Submission Messages.*/
function SuccessfulSubmissionMsg() {
  return (
    <div
      class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 mt-5 mb-1"
      role="alert"
    >
      <span class="font-medium">Success!</span> Your observation has been recorded.
    </div>
  );
}

function FailedSubmissionMsg() {
  return (
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-5 mb-1"
      role="alert"
    >
      <span class="font-medium">Oops, something went wrong!</span> Please try
      again and if the problem persists, contact us at support@tryexperimenter.com.
    </div>
  );
}

const ObservationForm = ({
  public_user_id,
  observation_prompt_id
}) => {
  /*Track whether we have a Successful Submission or not so we can display the appropriate message.*/
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);
  const [isFailedSubmission, setIsFailedSubmission] = useState(false);

  return (
    <Formik

      /*These are the values that are filled out in the form when it initially loads and each time it resets.*/
      initialValues={{
        observation: "",
        share_anonymously: true,
      }}

      /*Define form validation rules and error messages to display.*/
      validationSchema={Yup.object().shape({
        observation: Yup.string(),
      })}

      /*Define actions when the form is submitted.*/
      onSubmit={async (values, actions) => {

        console.log("ObservationForm: values before processing:");
        console.log(values);

        //Add metadata to values object.
        values["observation_prompt_id"] = observation_prompt_id
        values["public_user_id"] = public_user_id

        //Create "visibility" entry in values dictionary to match the format expected by the API. Delete "share_anonymously" entry.
        if (values["share_anonymously"] === true) {
          values["visibility"] = "public_anonymous";
        }
        else {
          values["visibility"] = "private";
        }
        delete values["share_anonymously"];

        //Sanitize user input for malicious HTML https://github.com/cure53/DOMPurify
        values["observation"] = DOMPurify.sanitize(values["observation"]);

        console.log("ObservationForm: values after processing:");
        console.log(values);

        //Send user entered values to API and save the resulting response.
        //Await enables us to wait to execute any additional code until we get the response back (and to use await elsewhere in this component).
        console.log("ObservationForm: submit form data to the BackendAPI");

        var dict_response = await BackendAPIDataService({
          endpoint_stub: "submit-observation",
          request_type: "post",
          payload: values,
        });

        console.log("ObservationForm: dict_response returned to component:");
        console.log(dict_response);

        /*Set submission status and amount of time to show success/failure message.*/
        if (dict_response.successful_request === true) {
          setIsSuccessfulSubmission(true);
          await seconds_to_sleep(2);
          setIsSuccessfulSubmission(false);
        } else {
          setIsFailedSubmission(true);
          await seconds_to_sleep(10);
          setIsFailedSubmission(false);
        }

        /*Reset form for another submission.*/
        actions.resetForm();
      }}
    >
      {() => (
        <Form>
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                <div class="flex-auto p-5 lg:p-10">
                  {/*Message Input*/}
                  <div class="relative w-full mb-3 mt-8">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="observation"
                    >
                      Observation
                    </label>
                    <Field
                      id="observation"
                      name="observation"
                      component="textarea"
                      rows="3"
                      placeholder="My observation is..."
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    />
                    <ErrorMessage
                      name="observation"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  {/*Share Anonymously Check Box*/}
                  <div class="flex items-center mb-4">
                    <label
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="share_anonymously"
                      type="checkbox"
                    >
                      Share Anonymously
                    </label>
                    <Field
                      id="share_anonymously"
                      name="share_anonymously"
                      type='checkbox'
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <ErrorMessage
                      name="share_anonymously"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  {/*Submit Button*/}
                  <div class="text-center mt-6">
                    <button
                      type="submit"
                      class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    >
                      Submit
                    </button>
                  </div>
                  {/*If a submission is successful (failed), displayed the appropriate message. Otherwise, display nothing.*/}
                  {isSuccessfulSubmission ? <SuccessfulSubmissionMsg /> : null}
                  {isFailedSubmission ? <FailedSubmissionMsg /> : null}
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { ObservationForm }