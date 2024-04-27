package curso.aula.loiane.crudspring.Models;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Enums.Converters.CategoryConverter;
import curso.aula.loiane.crudspring.Enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;

@Data
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "cursos")
    List<Lesson> lessons = new ArrayList<>();

}
