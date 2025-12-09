package com.todolist.backend.repository;

import com.todolist.backend.model.Group;
import com.todolist.backend.model.Todo;
import com.todolist.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(Boolean completed);
    List<Todo> findByTitleContainingIgnoreCase(String title);
    List<Todo> findAllByOrderByDeadlineAsc();
    List<Todo> findByUserAndGroupIsNullOrderByDeadlineAsc(User user);
    List<Todo> findByGroupOrderByDeadlineAsc(Group group);
    List<Todo> findByUserOrderByDeadlineAsc(User user);
    List<Todo> findByAssignedUsersContaining(User user);
}
