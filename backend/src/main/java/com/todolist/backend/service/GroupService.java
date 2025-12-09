package com.todolist.backend.service;

import com.todolist.backend.model.Group;
import com.todolist.backend.model.User;
import com.todolist.backend.repository.GroupRepository;
import com.todolist.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    
    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }
    
    public Group createGroup(String name, User owner) {
        Group group = new Group(name, owner);
        return groupRepository.save(group);
    }
    
    public List<Group> getUserGroups(User user) {
        return groupRepository.findByMembersContaining(user);
    }
    
    public Group getGroupById(Long id) {
        return groupRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Group not found"));
    }
    
    public Group addMember(Long groupId, Long userId, User currentUser) {
        Group group = getGroupById(groupId);
        
        if (!group.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the group owner can add members");
        }
        
        User userToAdd = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        group.addMember(userToAdd);
        return groupRepository.save(group);
    }
    
    public Group removeMember(Long groupId, Long userId, User currentUser) {
        Group group = getGroupById(groupId);
        
        if (!group.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the group owner can remove members");
        }
        
        User userToRemove = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        group.removeMember(userToRemove);
        return groupRepository.save(group);
    }
    
    public void deleteGroup(Long groupId, User currentUser) {
        Group group = getGroupById(groupId);
        
        if (!group.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the group owner can delete the group");
        }
        
        groupRepository.delete(group);
    }
}
