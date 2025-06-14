
import React, { useState } from 'react';
import { Image, Link2, Type, X } from 'lucide-react';

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    type: 'text' | 'image' | 'link';
    subreddit: string;
    url?: string;
    imageFile?: File;
  }) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose, onSubmit }) => {
  const [postType, setPostType] = useState<'text' | 'image' | 'link'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock delay
    setTimeout(() => {
      onSubmit({
        title,
        content,
        type: postType,
        subreddit,
        url: postType === 'link' ? url : undefined,
        imageFile: postType === 'image' ? imageFile || undefined : undefined,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setSubreddit('');
      setUrl('');
      setImageFile(null);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create a post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subreddit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Community *
              </label>
              <input
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="r/community"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="An interesting title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Content based on type */}
            {postType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text (optional)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            )}

            {postType === 'link' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            )}

            {postType === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imageFile ? (
                    <div>
                      <p className="text-gray-600 mb-2">Selected: {imageFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setImageFile(null)}
                        className="text-orange-500 hover:text-orange-600"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">Choose an image to upload</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-orange-500 hover:text-orange-600"
                      >
                        Browse files
                      </label>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Submit buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
