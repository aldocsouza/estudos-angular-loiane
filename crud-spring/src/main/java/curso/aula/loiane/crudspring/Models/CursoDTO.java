package curso.aula.loiane.crudspring.Models;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record CursoDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 1, max = 100) String name,
        @NotBlank @NotNull @Length(max = 10) @Pattern(regexp = "Back-end|Front-end") String category
) {
}
