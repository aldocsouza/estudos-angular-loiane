package curso.aula.loiane.crudspring.Models;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Enums.Converters.CategoryConverter;
import curso.aula.loiane.crudspring.Enums.Status;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;

@Entity
@SQLDelete(sql = "UPDATE Cursos SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
public class Cursos {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @NotBlank
    @Length(min = 1, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @NotNull
    @Column(length = 10, nullable = false)
    @Convert(converter = CategoryConverter.class)
    private Category category;

    @NotNull
    @Column(length = 10, nullable = false)
    private Status status = Status.ATIVO;

    @NotNull
    @NotEmpty
    @Valid
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "cursos")
    List<Lesson> lessons = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(@NotNull @NotBlank String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(@NotNull @NotBlank Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(@NotNull Status status) {
        this.status = status;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(@NotNull List<Lesson> lessons) {
        this.lessons = lessons;
    }

    @Override
    public String toString() {
        return "Cursos{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", status=" + status +
                ", lessons=" + lessons +
                '}';
    }
}
