package kz.iitu.userservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private int age;

    public User(String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
