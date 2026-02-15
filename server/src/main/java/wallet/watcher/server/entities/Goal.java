package wallet.watcher.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name="goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String goal;

    public Goal() {

    }

    public Goal(String email, String goal) {
        this.email = email;
        this.goal = goal;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getGoal() {
        return goal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    @Override
    public String toString() {
        return "Goal [id=" + id + ", goal=" + goal + "]";
    }
}
