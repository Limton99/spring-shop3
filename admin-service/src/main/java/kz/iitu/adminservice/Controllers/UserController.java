package kz.iitu.adminservice.Controllers;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import kz.iitu.adminservice.Models.Product;
import kz.iitu.adminservice.Models.User;
import kz.iitu.adminservice.Models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/users")
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/list")
    @HystrixCommand(fallbackMethod = "getFallBackUsers",
            threadPoolKey = "userInfoPool",
            threadPoolProperties = {
                    @HystrixProperty(name = "coreSize", value = "20"),
                    @HystrixProperty(name = "maxQueueSize", value = "20")
            }
    )
    public User[] getAllUsers() {
        ResponseEntity<User[]> response =
                restTemplate.getForEntity(
                        "http://user-service/api/v1/users/list",
                        User[].class);
        User[] users = response.getBody();

        return users;
    }

    public User[] getFallBackUsers() {
        User[] users = new User[1];
        return users;
    }


    @GetMapping
    public User getUserById(@RequestParam("userId") Long userId) {
        User user = restTemplate.getForObject("http://user-service/api/v1/users/"+userId, User.class);

        return user;
    }
}
