export const NewsLetterBox = () => {

    // Handler function for form submission
    const onSubmitHandler = () => {
        event.preventDefault(); // Prevent the default form submission behavior
    }

    return (
        <div className="text-center">
            {/* Section heading */}
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
            {/* Brief description */}
            <p className="text-gray-400 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nihil fuga consequuntur, labore natus esse.</p>
            {/* Subscription form */}
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                {/* Input field for the email address */}
                <input className="w-full sm:flex-1 outline-none" required type="email" placeholder="Enter your Email" />
                {/* Submit button */}
                <button type="submit" className="bg-black text-white text-sm px-10 py-4 font-medium">Subscribe</button>
            </form>
        </div>
    );
}
