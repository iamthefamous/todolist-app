package com.todolist.backend.repository;

import com.todolist.backend.model.Group;
import com.todolist.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByOwner(User owner);
    List<Group> findByMembersContaining(User user);
}
