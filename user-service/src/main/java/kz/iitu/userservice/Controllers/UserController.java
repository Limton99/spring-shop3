package kz.iitu.userservice.Controllers;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import kz.iitu.userservice.Models.User;
import kz.iitu.userservice.UserServiceApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @GetMapping("/list")
    List<User> getAll() {
        return UserServiceApplication.getUsers();
    }



    @GetMapping("/{userId}")
    @HystrixCommand(fallbackMethod = "getFallBackUser",
            threadPoolKey = "userInfoPool",
            threadPoolProperties = {
                    @HystrixProperty(name = "coreSize", value = "20"),
                    @HystrixProperty(name = "maxQueueSize", value = "20")
            }
    )
    User getById(@PathVariable("userId") Long userId) {
        User user = UserServiceApplication.getUsers().stream().filter(x -> x.getId() == userId).findFirst().orElse(null);
        return user;
    }

    public User getFallBackUser(@PathVariable Long id) {
        return new User("No users", 0);
    }
}
