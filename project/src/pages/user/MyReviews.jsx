import React, { useState } from 'react';
import { 
  Star, 
  Calendar, 
  MapPin,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const MyReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      tourTitle: 'Tropical Paradise Adventure',
      destination: 'Maldives',
      rating: 5,
      comment: 'Absolutely amazing experience! The beaches were pristine and the service was exceptional.',
      reviewDate: '2024-01-15',
      tourImage: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      tourTitle: 'Mountain Expedition',
      destination: 'Swiss Alps',
      rating: 4,
      comment: 'Great hiking experience with breathtaking views. The guide was very knowledgeable.',
      reviewDate: '2024-01-10',
      tourImage: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  // New: State for modal form
  const [modalForm, setModalForm] = useState({
    tourTitle: '',
    destination: '',
    rating: 0,
    comment: '',
    tourImage: ''
  });

  // New: Populate modal form when editing
  React.useEffect(() => {
    if (editingReview) {
      setModalForm({
        tourTitle: editingReview.tourTitle,
        destination: editingReview.destination,
        rating: editingReview.rating,
        comment: editingReview.comment,
        tourImage: editingReview.tourImage
      });
    } else if (showAddReview) {
      setModalForm({
        tourTitle: '',
        destination: '',
        rating: 0,
        comment: '',
        tourImage: ''
      });
    }
  }, [editingReview, showAddReview]);

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalForm(prev => ({ ...prev, [name]: value }));
  };
  const handleModalRatingChange = (rating) => {
    setModalForm(prev => ({ ...prev, rating }));
  };

  const getImageForDestination = (destination) => {
    switch (destination) {
      case "Maldives":
        return "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400";
      case "Swiss Alps":
        return "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400";
      case "India":
        return "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=400";
      case "Kenya":
        return "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400";
      default:
        return "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400";
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      // Update review
      setReviews(reviews.map(r => r.id === editingReview.id ? {
        ...r,
        ...modalForm,
        reviewDate: r.reviewDate,
        tourImage: getImageForDestination(modalForm.destination)
      } : r));
      setEditingReview(null);
    } else {
      // Add new review
      setReviews([
        {
          id: Date.now().toString(),
          ...modalForm,
          reviewDate: new Date().toISOString().split('T')[0],
          tourImage: getImageForDestination(modalForm.destination)
        },
        ...reviews
      ]);
      setShowAddReview(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
        <button
          onClick={() => setShowAddReview(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Latest Review</p>
              <p className="text-sm font-medium text-gray-900">
                {reviews.length > 0 ? formatDate(reviews[0].reviewDate) : 'No reviews yet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={review.tourImage}
                  alt={review.tourTitle}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {review.tourTitle}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {review.destination}
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">
                      Reviewed on {formatDate(review.reviewDate)}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingReview(review)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                  title="Edit Review"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-4">
            Share your travel experiences by writing reviews for the tours you've taken.
          </p>
          <button
            onClick={() => setShowAddReview(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
          >
            Write Your First Review
          </button>
        </div>
      )}

      {/* Add/Edit Review Modal */}
      {(showAddReview || editingReview) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
            </div>
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Package
                </label>
                <select
                  name="tourTitle"
                  value={modalForm.tourTitle}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select a tour package</option>
                  <option value="Tropical Paradise Adventure">Tropical Paradise Adventure</option>
                  <option value="Mountain Expedition">Mountain Expedition</option>
                  <option value="Cultural Heritage Tour">Cultural Heritage Tour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                 <select
                  name="destination"
                  value={modalForm.destination}
                  onChange={handleModalInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select a Destination</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Swiss Alps">Swiss Alps</option>
                  <option value="India">India</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                {renderStars(modalForm.rating, true, handleModalRatingChange)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  name="comment"
                  value={modalForm.comment}
                  onChange={handleModalInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddReview(false);
                    setEditingReview(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;