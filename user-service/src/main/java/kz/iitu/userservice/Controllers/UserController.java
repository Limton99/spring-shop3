package kz.iitu.userservice.Controllers;

import kz.iitu.userservice.Models.User;
import kz.iitu.userservice.UserServiceApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @GetMapping("/list")
    List<User> getAll() {
        return UserServiceApplication.getUsers();
    }

    @GetMapping("{userId}")
    User getById(@PathVariable("userId") Long userId) {
        User user = UserServiceApplication.getUsers().stream().filter(x -> x.getId() == userId).findFirst().orElse(null);
        return user;
    }
}
