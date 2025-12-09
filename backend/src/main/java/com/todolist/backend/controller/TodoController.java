package com.todolist.backend.controller;

import com.todolist.backend.model.Todo;
import com.todolist.backend.model.User;
import com.todolist.backend.service.TodoService;
import com.todolist.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    private final TodoService todoService;
    private final UserService userService;
    
    public TodoController(TodoService todoService, UserService userService) {
        this.todoService = todoService;
        this.userService = userService;
    }
    
    @GetMapping("/personal")
    public ResponseEntity<List<Todo>> getPersonalTodos(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            List<Todo> todos = todoService.getPersonalTodos(user);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<Todo>> getGroupTodos(@PathVariable Long groupId) {
        try {
            List<Todo> todos = todoService.getGroupTodos(groupId);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Todo>> getAllUserTodos(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            List<Todo> todos = todoService.getUserTodos(user);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(todo -> new ResponseEntity<>(todo, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping("/personal")
    public ResponseEntity<?> createPersonalTodo(@RequestBody Todo todo, 
                                               Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            Todo createdTodo = todoService.createPersonalTodo(todo, user);
            return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/group/{groupId}")
    public ResponseEntity<?> createGroupTodo(@PathVariable Long groupId,
                                            @RequestBody Todo todo,
                                            Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            Todo createdTodo = todoService.createGroupTodo(todo, groupId, user);
            return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, 
                                       @RequestBody Todo todo,
                                       Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            Todo updatedTodo = todoService.updateTodo(id, todo, user);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    
    @PostMapping("/{todoId}/assign/{userId}")
    public ResponseEntity<?> assignUser(@PathVariable Long todoId,
                                       @PathVariable Long userId,
                                       Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            Todo todo = todoService.assignUser(todoId, userId, user);
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id, Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.getCurrentUser(username);
            todoService.deleteTodo(id, user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
