# smart-yt-subtitles

AI-enabled tool to predict and define the user's unknown English vocabulary words when watching YouTube videos

This project has three levels:

1-Front-end: written in vanilla JS, a Google Chrome extension that tracks YouTube video subtitles in real-time.

2-Backend: Flask server that is linked to front-end, captures the subtitles for processing. Specifically, each word in the current subtitles is predicted to be known or unknown based on its "word prevelance" score (https://doi.org/10.3758/s13428-018-1077-9) to the user according to their proficiency level (A1-C2).

3-Gen-AI engine: User's English vocabulary range is predicted (according to A1-C2 language proficiency scale) by a fine-tuned generative AI model. Llama2-7b is fine-tuned with the corefl dataset (http://corefl.learnercorpora.com) to predict English learners' vocabulary range from their writing samples. Code is adopted from Deeplearning.AI seminar. Incomplete due to compute.

Acknoledgements: Soroosh Akef was consulted for linguistics resources and knowledge.
