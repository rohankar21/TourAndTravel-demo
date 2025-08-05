package com.travel.dao;

import com.travel.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistDao extends JpaRepository<Wishlist, Long> {
    
    List<Wishlist> findByUserId(Long userId);
    
    Optional<Wishlist> findByUserIdAndTourId(Long userId, Long tourId);
    
    boolean existsByUserIdAndTourId(Long userId, Long tourId);
    
    @Query("SELECT w FROM Wishlist w WHERE w.user.id = :userId ORDER BY w.addedAt DESC")
    List<Wishlist> findUserWishlistOrderByDate(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(w) FROM Wishlist w WHERE w.tour.id = :tourId")
    Long countWishlistByTourId(@Param("tourId") Long tourId);
    
    void deleteByUserIdAndTourId(Long userId, Long tourId);
} 