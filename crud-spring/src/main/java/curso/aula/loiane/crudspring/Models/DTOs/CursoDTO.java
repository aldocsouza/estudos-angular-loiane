package curso.aula.loiane.crudspring.Models.DTOs;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Enums.Status;
import curso.aula.loiane.crudspring.Enums.Validation.ValueOfEnum;
import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CursoDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 1, max = 100)
        String name,

        @NotNull @ValueOfEnum(enumClass = Category.class)
        String category,

        @NotNull @NotEmpty @Valid
        List<LessonDTO> lessons
) {
}
