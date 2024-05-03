package curso.aula.loiane.crudspring.Models.DTOs;

import jakarta.persistence.Column;

public record LessonDTO (
        Long id,
        @Column(length = 100, nullable = false)
        String name,
        @Column(length = 11, nullable = false)
        String youtubeUrl
){
}
