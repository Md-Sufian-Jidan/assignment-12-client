
const Faq = () => {
    return (
        <section className="bg-pink-100/20 text-gray-800 my-5">
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="text-2xl font-semibold sm:text-4xl text-center">Your Questions, Answered</h2>
                <p className="mt-4 mb-8 text-gray-600 text-center max-w-4xl mx-auto">Welcome to our FAQ section! Here, we haveve compiled answers to the most common questions about our diagnostic center services. Whether you are curious about booking procedures, test preparations, or insurance coverage, you will find all the essential information you need. If you have any additional queries, feel free to reach out to our customer support team for further assistance.</p>
                <div className="space-y-4">
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">What is a diagnostic test?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">A diagnostic test is a medical test performed to identify the presence or absence of a disease or condition. It helps in the diagnosis, monitoring, and treatment of various health conditions.</p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">How do I book a diagnostic test online?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">To book a diagnostic test online, simply visit our website, select the test you need, choose a convenient date and time, and complete the booking process by providing your details and making the payment.</p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">What should I do to prepare for a diagnostic test?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600"> Preparation for a diagnostic test varies depending on the type of test. Some tests may require fasting, while others might need you to avoid certain medications. Detailed instructions will be provided at the time of booking.</p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">How will I receive my test results?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">Test results will be available on our website or mobile app. You will receive an email or SMS notification once your results are ready. You can also choose to have the results emailed to you directly.</p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-default-600">What if I need to cancel or reschedule my appointment?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">You can cancel or reschedule your appointment through our website or by contacting our customer support team. Please note that cancellation policies may apply..</p>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Faq;