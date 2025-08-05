package com.travel.service.impl;

import com.travel.dao.TourDao;
import com.travel.dao.UserDao;
import com.travel.dao.WishlistDao;
import com.travel.dto.TourDto;
import com.travel.dto.UserDto;
import com.travel.entity.Tour;
import com.travel.entity.User;
import com.travel.entity.Wishlist;
import com.travel.exception.ResourceNotFoundException;
import com.travel.service.TourService;
import com.travel.service.UserService;
import com.travel.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    
    private final WishlistDao wishlistDao;
    private final UserDao userDao;
    private final TourDao tourDao;
    private final UserService userService;
    private final TourService tourService;
    
    @Override
    public void addToWishlist(Long userId, Long tourId) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        Tour tour = tourDao.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with id: " + tourId));
        
        if (wishlistDao.existsByUserIdAndTourId(userId, tourId)) {
            throw new RuntimeException("Tour is already in wishlist");
        }
        
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setTour(tour);
        
        wishlistDao.save(wishlist);
    }
    
    @Override
    public void removeFromWishlist(Long userId, Long tourId) {
        if (!wishlistDao.existsByUserIdAndTourId(userId, tourId)) {
            throw new ResourceNotFoundException("Wishlist item not found");
        }
        
        wishlistDao.deleteByUserIdAndTourId(userId, tourId);
    }
    
    @Override
    public List<TourDto> getUserWishlist(Long userId) {
        return wishlistDao.findUserWishlistOrderByDate(userId).stream()
                .map(wishlist -> tourService.getTourById(wishlist.getTour().getId()))
                .collect(Collectors.toList());
    }
    
    @Override
    public boolean isInWishlist(Long userId, Long tourId) {
        return wishlistDao.existsByUserIdAndTourId(userId, tourId);
    }
    
    @Override
    public Long getWishlistCountByTourId(Long tourId) {
        return wishlistDao.countWishlistByTourId(tourId);
    }
    
    @Override
    public List<TourDto> getCurrentUserWishlist() {
        UserDto currentUser = userService.getCurrentUser();
        return getUserWishlist(currentUser.getId());
    }
}