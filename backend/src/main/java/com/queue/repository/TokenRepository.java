package com.queue.repository;

import com.queue.entity.Token;
import com.queue.entity.TokenStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByCitizenIdOrderByCreatedAtDesc(Long citizenId);
    List<Token> findByQueueIdOrderByQueueSequenceAsc(Long queueId);
    boolean existsByCitizenIdAndStatusIn(Long citizenId, List<TokenStatus> statuses);
}
