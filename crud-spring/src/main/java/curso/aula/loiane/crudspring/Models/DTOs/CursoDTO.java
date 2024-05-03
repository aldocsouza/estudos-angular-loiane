package curso.aula.loiane.crudspring.Models.DTOs;

import curso.aula.loiane.crudspring.Enums.Converters.CategoryConverter;
import curso.aula.loiane.crudspring.Models.Lesson;
import jakarta.persistence.Convert;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CursoDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 1, max = 100)
        String name,

        @NotNull @Convert(converter = CategoryConverter.class)
        String category,
        List<LessonDTO> lessons
) {
}
