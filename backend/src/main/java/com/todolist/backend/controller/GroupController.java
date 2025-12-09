package com.todolist.backend.controller;

import com.todolist.backend.model.Group;
import com.todolist.backend.model.User;
import com.todolist.backend.service.GroupService;
import com.todolist.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
    
    private final GroupService groupService;
    private final UserService userService;
    
    public GroupController(GroupService groupService, UserService userService) {
        this.groupService = groupService;
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody Map<String, String> request, 
                                        Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            Group group = groupService.createGroup(request.get("name"), user);
            return new ResponseEntity<>(group, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Group>> getUserGroups(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            List<Group> groups = groupService.getUserGroups(user);
            return new ResponseEntity<>(groups, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable Long id) {
        try {
            Group group = groupService.getGroupById(id);
            return new ResponseEntity<>(group, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/{groupId}/members/{userId}")
    public ResponseEntity<?> addMember(@PathVariable Long groupId, 
                                      @PathVariable Long userId,
                                      Authentication authentication) {
        try {
            String username = authentication.getName();
            User currentUser = userService.getCurrentUser(username);
            Group group = groupService.addMember(groupId, userId, currentUser);
            return new ResponseEntity<>(group, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    
    @DeleteMapping("/{groupId}/members/{userId}")
    public ResponseEntity<?> removeMember(@PathVariable Long groupId, 
                                         @PathVariable Long userId,
                                         Authentication authentication) {
        try {
            String username = authentication.getName();
            User currentUser = userService.getCurrentUser(username);
            Group group = groupService.removeMember(groupId, userId, currentUser);
            return new ResponseEntity<>(group, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id, Authentication authentication) {
        try {
            String username = authentication.getName();
            User currentUser = userService.getCurrentUser(username);
            groupService.deleteGroup(id, currentUser);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
