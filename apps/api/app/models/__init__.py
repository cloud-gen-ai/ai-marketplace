from app.core.database import Base

# Import all models so SQLAlchemy metadata sees them before create_all().
from app.models.license import License  # noqa: F401
from app.models.product import Product  # noqa: F401
from app.models.review import Review  # noqa: F401
from app.models.subscription import Subscription  # noqa: F401
from app.models.user import User  # noqa: F401

__all__ = ["Base"]
