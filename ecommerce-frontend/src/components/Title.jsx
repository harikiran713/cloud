import PropTypes from "prop-types";

const Title = ({ text1, text2 }) => {
    return (
        <div className="inline-flex flex-col items-center gap-2 mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-gray-800">
                <span className="text-pink-600">{text1}</span>
                <span className="text-indigo-600">{text2}</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>
    );
};

Title.propTypes = {
    text1: PropTypes.string.isRequired,
    text2: PropTypes.string.isRequired,
};

export default Title;
