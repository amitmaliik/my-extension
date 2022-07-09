'use strict';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message, 'message');
    (async () => {
      await tf.ready();
      try {
        use.load().then((model) => {
          const sentences = ['Hello.', 'How are you?'];
          console.log(model, 'model');

          model
            .embed(sentences)
            .then((embeddings) => embeddings.print(true /* verbose */));
        });
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }
    })();

    sendResponse({
      message,
    });
  }
});
