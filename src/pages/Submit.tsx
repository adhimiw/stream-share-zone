
import React, { useState } from 'react';
import Header from '../components/Header';
import { Link2, Image, Type } from 'lucide-react';

const Submit = () => {
  const [postType, setPostType] = useState<'text' | 'link' | 'image'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting post:', { postType, title, content, subreddit, url });
    // In a real app, this would submit to an API
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a post</h1>
          
          {/* Post Type Selection */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setPostType('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                postType === 'text' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Type className="h-4 w-4" />
              <span>Text</span>
            </button>
            
            <button
              onClick={() => setPostType('image')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                postType === 'image' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image className="h-4 w-4" />
              <span>Image</span>
            </button>
            
            <button
              onClick={() => setPostType('link')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                postType === 'link' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Link2 className="h-4 w-4" />
              <span>Link</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subreddit Selection */}
            <div>
              <label htmlFor="subreddit" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a community *
              </label>
              <input
                type="text"
                id="subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="r/community"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="An interesting title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">{title.length}/300</p>
            </div>

            {/* Content based on post type */}
            {postType === 'text' && (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Text (optional)
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
            )}

            {postType === 'link' && (
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required={postType === 'link'}
                />
              </div>
            )}

            {postType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Drag and drop an image, or click to browse</p>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submit;
