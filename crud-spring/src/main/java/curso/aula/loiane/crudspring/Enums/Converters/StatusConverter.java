package curso.aula.loiane.crudspring.Enums.Converters;

import curso.aula.loiane.crudspring.Enums.Status;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(Status status) {
        if(status == null){
            return null;
        }
        return status.getStatus();
    }

    @Override
    public Status convertToEntityAttribute(String status) {
        if(status == null){
            return null;
        }
        return Stream.of(Status.values())
                .filter(s -> s.getStatus().equals(status))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
