package com.cloud.crypto.firebase;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.Timestamp;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Id;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class SyncService {

    @PersistenceContext
    private EntityManager entityManager;

    private final Firestore firestore;

    public SyncService(Firestore firestore) {
        this.firestore = firestore;
    }

    // @Scheduled(fixedRate = 60000) // Sync every 1 minute
    public void syncAllTablesToFirestore() {
        entityManager.getMetamodel().getEntities().forEach(entity -> {
            try {
                syncTable(entity);
            } catch (Exception e) {
                System.err.println("Error syncing table " + entity.getName() + ": " + e.getMessage());
            }
        });
    }

    private void syncTable(EntityType<?> entityType) throws Exception {
        String tableName = entityType.getJavaType().getSimpleName(); // Use actual entity class name
        List<?> entities = entityManager.createQuery("FROM " + tableName, entityType.getJavaType()).getResultList();

        for (Object entity : entities) {
            Map<String, Object> data = convertEntityToMap(entity);
            String documentId = getEntityId(entity);
            firestore.collection(tableName).document(documentId).set(data);
        }

        System.out.println("Synced " + tableName + " successfully.");
    }

    private Map<String, Object> convertEntityToMap(Object entity) {
        Map<String, Object> data = new HashMap<>();
    
        for (Field field : entity.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(entity);
    
                if (value == null) {
                    data.put(field.getName(), null);
                } else if (value instanceof LocalDate) {
                    data.put(field.getName(), value.toString()); // Convert LocalDate to String
                } else if (value instanceof LocalDateTime) {
                    data.put(field.getName(), convertToTimestamp((LocalDateTime) value)); // Convert LocalDateTime to Timestamp
                } else if (value instanceof Number || value instanceof String || value instanceof Boolean) {
                    data.put(field.getName(), value); // Handle simple types
                } else {
                    // Handle nested objects recursively
                    data.put(field.getName(), convertEntityToMap(value));
                }
            } catch (IllegalAccessException e) {
                System.err.println("Error accessing field " + field.getName() + ": " + e.getMessage());
            }
        }
        return data;
    }

    private String getEntityId(Object entity) throws IllegalAccessException {
        for (Field field : entity.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getAnnotation(Id.class) != null) {
                return field.get(entity).toString();
            }
        }
        throw new IllegalStateException("No @Id field found in " + entity.getClass().getSimpleName());
    }

    private Timestamp convertToTimestamp(LocalDateTime dateTime) {
        Date date = Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant());
        return Timestamp.of(date);
    }
}
 
