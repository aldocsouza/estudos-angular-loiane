package curso.aula.loiane.crudspring.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 11, nullable = false)
    private String youtubeUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "curso_id", nullable = false)
    private Cursos cursos;

}