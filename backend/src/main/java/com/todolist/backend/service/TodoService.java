package com.todolist.backend.service;

import com.todolist.backend.model.Group;
import com.todolist.backend.model.Todo;
import com.todolist.backend.model.User;
import com.todolist.backend.repository.GroupRepository;
import com.todolist.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    private final TodoRepository todoRepository;
    private final GroupRepository groupRepository;
    
    public TodoService(TodoRepository todoRepository, GroupRepository groupRepository) {
        this.todoRepository = todoRepository;
        this.groupRepository = groupRepository;
    }
    
    public List<Todo> getPersonalTodos(User user) {
        return todoRepository.findByUserAndGroupIsNullOrderByDeadlineAsc(user);
    }
    
    public List<Todo> getGroupTodos(Long groupId) {
        Group group = groupRepository.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));
        return todoRepository.findByGroupOrderByDeadlineAsc(group);
    }
    
    public List<Todo> getUserTodos(User user) {
        return todoRepository.findByUserOrderByDeadlineAsc(user);
    }
    
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    public Todo createPersonalTodo(Todo todo, User user) {
        todo.setUser(user);
        todo.setGroup(null);
        return todoRepository.save(todo);
    }
    
    public Todo createGroupTodo(Todo todo, Long groupId, User user) {
        Group group = groupRepository.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));
        
        if (!group.getMembers().contains(user)) {
            throw new RuntimeException("User is not a member of this group");
        }
        
        todo.setUser(user);
        todo.setGroup(group);
        return todoRepository.save(todo);
    }
    
    public Todo updateTodo(Long id, Todo todoDetails, User user) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        
        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only update your own todos");
        }
        
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.getCompleted());
        todo.setDeadline(todoDetails.getDeadline());
        todo.setPriority(todoDetails.getPriority());
        
        return todoRepository.save(todo);
    }
    
    public Todo assignUser(Long todoId, Long userId, User currentUser) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new RuntimeException("Todo not found"));
        
        if (todo.getGroup() == null) {
            throw new RuntimeException("Can only assign users to group todos");
        }
        
        if (!todo.getGroup().getMembers().contains(currentUser)) {
            throw new RuntimeException("You must be a member of the group");
        }
        
        // Fetch the user from repository to ensure it's a managed entity
        User userToAssign = groupRepository.findById(todo.getGroup().getId())
            .orElseThrow(() -> new RuntimeException("Group not found"))
            .getMembers().stream()
            .filter(u -> u.getId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("User not found in group"));
        
        todo.addAssignedUser(userToAssign);
        
        return todoRepository.save(todo);
    }
    
    public void deleteTodo(Long id, User user) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        
        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only delete your own todos");
        }
        
        todoRepository.delete(todo);
    }
}
