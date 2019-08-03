import { AppBuckets } from '@myiworlds/types';

const buckets: AppBuckets = {
  development: {
    image: {
      public: 'miw-development-image-public',
      private: 'miw-development-image-private',
    },
    video: {
      public: 'miw-development-video-public',
      private: 'miw-development-video-private',
    },
    audio: {
      public: 'miw-development-audio-public',
      private: 'miw-development-audio-private',
    },
    text: {
      public: 'miw-development-text-public',
      private: 'miw-development-text-private',
    },
  },
  qa: {
    image: {
      public: 'miw-qa-image-public',
      private: 'miw-qa-image-private',
    },
    video: {
      public: 'miw-qa-video-public',
      private: 'miw-qa-video-private',
    },
    audio: {
      public: 'miw-qa-audio-public',
      private: 'miw-qa-audio-private',
    },
    text: {
      public: 'miw-qa-text-public',
      private: 'miw-qa-text-private',
    },
  },
  production: {
    image: {
      public: 'miw-production-image-public',
      private: 'miw-production-image-private',
    },
    video: {
      public: 'miw-production-video-public',
      private: 'miw-production-video-private',
    },
    audio: {
      public: 'miw-production-audio-public',
      private: 'miw-production-audio-private',
    },
    text: {
      public: 'miw-production-text-public',
      private: 'miw-production-text-private',
    },
  },
};

export default buckets;
