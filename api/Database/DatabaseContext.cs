using api.Database.Entities;
using api.Database.EntityConfigs;
using Microsoft.EntityFrameworkCore;

namespace api.Database;

public class DatabaseContext:DbContext
{
    public DatabaseContext(DbContextOptions dbContextOptions):base(dbContextOptions){}
    
    protected DatabaseContext(){}
    
    public virtual DbSet<UserEntity> UserEntities { get; set; }
    public virtual DbSet<AccountEntity> AccountEntities { get; set; }
    public virtual DbSet<AtmEntity> AtmEntities { get; set; }
    public virtual DbSet<TransactionEntity> TransactionEntities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new UserConfig());
        modelBuilder.ApplyConfiguration(new AtmConfig());
        modelBuilder.ApplyConfiguration(new AccountConfig());
        modelBuilder.ApplyConfiguration(new TransactionConfig());
    } 
}